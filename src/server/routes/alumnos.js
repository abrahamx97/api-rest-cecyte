const Router = require('koa-router');
const queries = require('../db/queries/alumnos');
const jwt = require('../middlewares/jwt')

const router = new Router();
const BASE_URL = `/api/v1/alumnos`;
const BASE_URL_CAL = `/api/v1/calificaciones/alumnos`;
http://localhost:1337/api/v1/calificaciones/alumnos/16427070078841
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
