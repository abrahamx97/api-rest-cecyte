const knex = require('../connection');
const bcrypt = require('bcrypt')

function getAlumnos() {
    return knex.select('*').from('valumnosboleta')
}

function getAlumno(matricula) {
    return knex.with('inf_alumno', knex.raw(`select * from info_alumno('${matricula}')`)).select('*').from('inf_alumno')
}

function getCalificacionesAlumno(matricula) {
    return knex.with('calificaciones', knex.raw(`select * from calificaciones_alumno('${matricula}')`)).select('*').from('calificaciones')
}

function actualizarContrasena(matricula, alumno) {
    let contrasena = ''
    contrasena=bcrypt.hashSync( alumno.contrasena, 10)
    return knex('control_alumnos')
        .update({contrasena: contrasena })
        .where({ matricula: matricula })
        .returning(['id', 'matricula', 'contrasena']);
}



module.exports = {
    getAlumnos,
    getAlumno,
    getCalificacionesAlumno,
    actualizarContrasena
};
