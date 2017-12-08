const knex = require('../connection')

function getAlumno(matricula){
    return knex('control_alumnos')
    .select('matricula', 'contrasena').where('matricula',matricula)
}

module.exports = {
    getAlumno
}