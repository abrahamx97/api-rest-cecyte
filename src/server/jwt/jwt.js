const KoaJwt = require('koa-jwt');
const jsonwebtoken = require("jsonwebtoken");
const secretKey = require('./jwt.key')
const SECRET_KEY = secretKey.secretKey()
module.exports = KoaJwt({
    secret: SECRET_KEY,
})

// helper function
module.exports.sign = (payload) => {
    return jsonwebtoken.sign(payload, SECRET_KEY, {
        expiresIn: '36h'
    });
};

module.exports.secretkey = () => {
    return SECRET_KEY;
}

module.exports.getToken = (context) => {
    let cad = JSON.stringify(context.request.header.authorization)
    let token = cad.substr(cad.indexOf(' ') + 1, cad.length - cad.indexOf(' ') - 2)
    return token
}

module.exports.validateToken = (context) => {
    let cad = JSON.stringify(context.request.header.authorization)
    let token = cad.substr(cad.indexOf(' ') + 1, cad.length - cad.indexOf(' ') - 2)
    let isValid = true
    try {
        jsonwebtoken.verify(token, SECRET_KEY, (error, decoded) => {
            if (error) {
                isValid = false
                return
            }
        })
    } catch (error) {

    }

    return isValid
}

