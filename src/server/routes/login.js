const Router = require('koa-router');
const queries = require('../db/queries/login');
const jwt = require('../jwt/jwt')
const bcrypt = require('bcrypt')

const router = new Router();
const BASE_URL = `/api/v1/login`;

router.post(`${BASE_URL}/alumno`, async (ctx) => {
    try {
        const dataToken = await queries.getTokenAlumno(ctx.request.body.usuario)
        if (dataToken.length) {
            if (bcrypt.compareSync(ctx.request.body.contrasena, dataToken[0].contrasena)) {
                ctx.status = 200
                ctx.body = {
                    status: 'success',
                    token: dataToken[0].token
                };
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 'error',
                    message: 'Contrasena incorrecta.'
                };
            }
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'No se encontro el alumno.'
            };
        }
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            status: 'error',
            message: 'Error en el servidor.'
        };
    }
})


module.exports = router;
