const KoaJwt = require('koa-jwt');
const jsonwebtoken = require("jsonwebtoken");
const SECRET = '\x96\xcc\x15\xf0B\xa0\x1d\xf3=\x88\x0b\xf1\xaf=\xa7\x0e\xcahOXf\xa5\x88\xf2\x0c\xa89\x06"~s*\xa5\xd3\xc89\x07[\xfcv\xd2\xb6?\x9e\xd6\x0c\x1e_p\x87\xee6"C\xb9&\xb0o\xb0\xa9\xdc!\xb9gZAM1m\xe6';
module.exports = KoaJwt({
    secret: SECRET,
})

// helper function
module.exports.sign = (payload) => {
    return jsonwebtoken.sign(payload, SECRET);
};

module.exports.secret_key = () => {
    return SECRET;
}
