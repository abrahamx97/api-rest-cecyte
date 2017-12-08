const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const indexRoutes = require('./routes/index');
const alumnosRoutes = require('./routes/alumnos');
const loginRoutes = require('./routes/login');

const app = new Koa();
const cors = require('@koa/cors');
const PORT = process.env.PORT || 1337;

app.use(cors({
    origin: '*'
}))
app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(alumnosRoutes.routes());
app.use(loginRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;