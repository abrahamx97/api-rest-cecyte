const bcrypt = require('bcrypt')

let phash = '$2a$10$WdkEHsdRZv7LEEgEXJvlVuKiJqMr6l0SFx0z9hH8Ako1rdN7HP.Kq'
let hashed = ''
console.log(phash.length)

bcrypt.compare('cecyteroot',phash, function(err, res){
    if(res){
        console.log('contrasena correcta')
    }else{
        console.log('contraseña incorrecta')
    }
})

bcrypt.hash('cecyteroot', 10, function(err, hash){
    console.log(hash)
})


