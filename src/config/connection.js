const { config } = require('dotenv')
const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()
// objeto com configurações da conexão
const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE

})
module.exports = connection
