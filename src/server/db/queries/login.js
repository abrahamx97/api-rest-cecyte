
const knex = require('../connection')
const jwt = require('../../jwt/jwt')


function getTokenAlumno(matricula){
    return knex.select('id', 'matricula', 'contrasena').from('control_alumnos')
    .where({
        matricula: matricula
    }).then( (rows)=>{
        let token = jwt.sign({
            id: rows[0].id, usuario: rows[0].matricula, contrasena: rows[0].contrasena, tipo: 'alumno'
        })
        return knex('control_alumnos')
        .update({token: token })
        .where({ matricula: matricula })
        .returning(['token', 'contrasena']);
    }).catch((error)=>{    
        return error
    })
}

module.exports = {
    getTokenAlumno
}