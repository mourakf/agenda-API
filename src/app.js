// importar o app e chamar a função do arq customExpress
const customExpress = require('./config/customExpress.js')
const dotenv = require('dotenv')
const Tables = require('./models/tables')
dotenv.config()

//importar conexão do banco de dados
const connection = require('./config/connection')
// conectar ao banco
connection.connect(error => {
    if(error) {
        console.log(error)
    } 
    else {
        const app = customExpress()
        Tables.init(connection)
        app.listen(process.env.PORT, () => console.log("servidor on"))

    }
})

