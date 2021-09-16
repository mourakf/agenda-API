// importar o app e chamar a função do arq customExpress
const customExpress = require('./config/customExpress.js')
const dotenv = require('dotenv')
dotenv.config()

//importar conexão do banco de dados
const connection = require('./models/connection')
// conectar ao banco
connection.connect(error => {
    if(error) {
        console.log(error)
    } 
    else {
        const app = customExpress()
        app.listen(process.env.PORT, () => console.log("servidor on"))

    }
})

