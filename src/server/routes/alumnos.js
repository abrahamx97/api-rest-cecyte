const Router = require('koa-router');
const queries = require('../db/queries/alumnos');
const jwt = require('../jwt/jwt')

const router = new Router();
const BASE_URL = `/api/v1/alumnos`;
const BASE_URL_CAL = `/api/v1/calificaciones/alumnos`;
const BASE_URL_ACTUALIZAR_CONTRASENA = `/api/v1/contrasena/alumnos`

router.get(BASE_URL, jwt, async (ctx) => {
    try {
        const alumnos = await queries.getAlumnos();
        if (alumnos.length) {
            ctx.status = 200
            ctx.body = {
                status: 'success',
                data: alumnos
            };
        } else {

        }
    } catch (error) {
        console.log(error)
        ctx.status = 500;
        ctx.body = {
            status: 'error',
            message: 'Error en el servidor.'
        };
    }
})

router.get(`${BASE_URL}/:mat`, jwt, async (ctx) => {
    try {
        const alumno = await queries.getAlumno(ctx.params.mat, jwt.getToken(ctx));
        if (alumno.length) {
            ctx.status = 200
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
    } catch (error) {
        console.log(error)
        ctx.status = 500;
        ctx.body = {
            status: 'error',
            message: 'Error en el servidor.'
        };
    }
})

router.get(`${BASE_URL_CAL}/:mat`, jwt, async (ctx) => {
    try {
        const calificaciones = await queries.getCalificacionesAlumno(ctx.params.mat, jwt.getToken(ctx));
        if (calificaciones.length) {
            ctx.status = 200
            ctx.body = {
                status: 'success',
                data: calificaciones
            }
        } else {
            ctx.status = 404
            ctx.body = {
                status: 'error',
                message: 'No se encontro el alumno.'
            }
        }
    } catch (error) {
        console.log(error)
        ctx.status = 500;
        ctx.body = {
            status: 'error',
            message: 'Error en el servidor.'
        };
    }
})

router.put(`${BASE_URL_ACTUALIZAR_CONTRASENA}/:mat`, jwt, async (ctx) => {
    try {
        const alumno = await queries.actualizarContrasena(ctx.params.mat, ctx.request.body, jwt.getToken(ctx))
        if (alumno.length) {
            ctx.status = 200
            ctx.body = {
                status: 'success',
                token: alumno[0].token
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'No se encontro el alumno.'
            };
        }
    } catch (error) {
        console.log(error)
        ctx.status = 500;
        ctx.body = {
            status: 'error',
            message: 'Error en el servidor.'
        };
    }
})


module.exports = router;
