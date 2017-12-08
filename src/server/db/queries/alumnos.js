const knex = require('../connection');

function getAlumnos() {
	return knex.select('*').from('valumnosboleta')
}

function getAlumno(matricula) {
	return knex.with('inf_alumno', knex.raw(`select * from info_alumno('${matricula}')`)).select('*').from('inf_alumno')
}

function getCalificacionesAlumno(matricula){
    return knex.with('calificaciones', knex.raw(`select * from calificaciones_alumno('${matricula}')`)).select('*').from('calificaciones')
}



module.exports = {
	getAlumnos,
    getAlumno,
    getCalificacionesAlumno  
};
