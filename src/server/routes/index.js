const Router = require('koa-router');
const router = new Router();
const jwt = require('../jwt/jwt');

router.get('/', jwt, async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

module.exports = router;
