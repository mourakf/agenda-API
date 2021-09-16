const mysql = require('mysql2')
// objeto com configurações da conexão
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORDB,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE

})
module.exports = connection
