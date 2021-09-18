const express = require('express')
const consign = require('consign')

// configurar e exportar o módulo
module.exports = () => {
    const app = express();
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    consign()
    .include('./src/controllers')
    .into(app)
    return app

}