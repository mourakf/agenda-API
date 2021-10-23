const conn = require('../config/connection')
const uploadFile = require('../files/uploadFiles')
class Pet {
    addPet(pet, res){
        uploadFile(pet.imagem, pet.nome, (imgPath) => {
            const newPet = {nome: pet.nome, imagem: imgPath}
            const insert = `INSERT INTO PETS SET ?`
            conn.query(insert, newPet, (erro) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(newPet)
                }
            })
        }
        )
    } 
}

module.exports = new Pet()