# api-rest-cecyte
API REST de control escolar cecyte

INSTALACIÓN

1. Clone el repositorio.
2. Agregue a la raíz del directorio el archivo "knexfile.js"
3. Corra el comando "npm install"
4. Arranque el servidor con el comando "npm start"


CONTENIDO DEL ARCHIVO "knexfile.js"
//COMIENZA CONTENIDO

const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
    test: {
        client: 'pg',
        connection: 'postgres://username:password@host:port/database',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    development: {
        client: 'pg',
        connection: 'postgres://username:password@host:port/database',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
};

//FINALIZA CONTENIDO
