const Router = require('koa-router');
const queries = require('../db/queries/login');
const jwt = require('../middlewares/jwt')
const bcrypt = require('bcrypt')

const router = new Router();
const BASE_URL = `/api/v1/login`;

router.post(`${BASE_URL}/alumno`, async (ctx) => {
    try {
        const alumno = await queries.getAlumno(ctx.request.body.usuario);
        if (alumno.length) {
            if (bcrypt.compareSync(ctx.request.body.contrasena, alumno[0].contrasena)) {
                ctx.status = 200
                ctx.body = {
                    status: 'success',
                    token: jwt.sign({ id: alumno[0].id, usuario: alumno[0].matricula, contrasena: alumno[0].contrasena }, jwt.secret_key())
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

/*router.get(`${BASE_URL}/:mat`, jwt, async (ctx) => {
  try {
    const alumno = await queries.getAlumno(ctx.params.mat);
    if (alumno.length) {
      ctx.body = {
        status: 'success',
        data: alumno
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'No se encontró el alumno.'
      };
    }
  } catch (err) {
    console.log(err)
  }
})*/

/*router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const movie = await queries.addMovie(ctx.request.body);
    if (movie.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.updateMovie(ctx.params.id, ctx.request.body);
    if (movie.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.deleteMovie(ctx.params.id);
    if (movie.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})*/

module.exports = router;
