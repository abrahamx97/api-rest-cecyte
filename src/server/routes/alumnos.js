const Router = require('koa-router');
const queries = require('../db/queries/alumnos');
const jwt = require('../middlewares/jwt')

const router = new Router();
const BASE_URL = `/api/v1/alumnos`;
const BASE_URL_CAL = `/api/v1/calificaciones/alumnos`;
const BASE_URL_ACTUALIZAR_CONTRASENA = `/api/v1/contrasena/alumnos`

router.get(BASE_URL, jwt, async (ctx) => {
    try {
        const alumnos = await queries.getAlumnos();
        if (alumnos.length) {
            ctx.status=200
            ctx.body = {
                status: 'success',
                data: alumnos
            };   
        } else {
            
        }
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/:mat`, jwt, async (ctx) => {
    try {
        const alumno = await queries.getAlumno(ctx.params.mat);
        if (alumno.length) {
            ctx.status=200
            ctx.body = {
                status: 'success',
                data: alumno
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'No se encontro el alumno.'
            };
        }
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL_CAL}/:mat`, jwt, async (ctx) => {
    try {
        const calificaciones = await queries.getCalificacionesAlumno(ctx.params.mat);
        if (calificaciones.length) {
            ctx.status=200
            ctx.body = {
                status: 'success',
                data: calificaciones
            }
        } else {
            ctx.status = 404
            ctx.body = {
                state: 'error',
                message: 'No se encontro el alumno'
            }
        }
    } catch (error) {
        console.log(error)
    }
} )

router.put(`${BASE_URL_ACTUALIZAR_CONTRASENA}/:mat`, jwt, async (ctx) => {
    try {
        const alumno = await queries.actualizarContrasena(ctx.params.mat, ctx.request.body)
        if(alumno.length){
            ctx.status = 200
            ctx.body = {
                status: 'success',
                token: jwt.sign({ id: alumno[0].id, usuario: alumno[0].matricula, contrasena: alumno[0].contrasena }, jwt.secret_key())
            };
        }else{
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'No se encontro el alumno.'
            };
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
