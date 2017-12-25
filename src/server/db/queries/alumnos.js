const knex = require('../connection');
const bcrypt = require('bcrypt')
const jwt = require('../../jwt/jwt')

function getAlumnos() {
    return knex.with('inf_alumnos', knex.raw(`select * from info_alumnos()`)).select('*').from('inf_alumnos')
}

function getAlumno(matricula, token) {
    return knex.with('inf_alumno', knex.raw(`select * from info_alumno('${matricula}', '${token}')`)).select('*').from('inf_alumno')
}

function getCalificacionesAlumno(matricula, token) {
    return knex.with('calificaciones', knex.raw(`select * from calificaciones_alumno('${matricula}', '${token}')`)).select('*').from('calificaciones')
}

function actualizarContrasena(matricula, alumno, token) {
    let contrasena = ''
    contrasena = bcrypt.hashSync(alumno.contrasena, 10)
    return knex.select('id', 'matricula').from('control_alumnos')
        .where({ matricula: matricula })
        .then((rows) => {
            let token = jwt.sign({
                id: rows[0].id, usuario: rows[0].matricula, contrasena: contrasena, tipo: 'alumno'
            })
            return knex('control_alumnos')
            .update({
                contrasena: contrasena,
                token: token
            })
            .where({matricula: matricula})
            .returning(['token'])
        }).catch((error)=>{
            return error
        })
}


module.exports = {
    getAlumnos,
    getAlumno,
    getCalificacionesAlumno,
    actualizarContrasena,
};
