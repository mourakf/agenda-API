const Pets = require('../models/petsModel')

module.exports = app => {
    app.post('/pet', (req,res) => {
        const pet = req.body
        Pets.addPet(pet, res)
    })


    app.get('/pet/:id', (req,res) => {
        const id = req.params.id
        Pets.getById(parseInt(id),res)
    })

    app.get('/pet', (req, res) => {
        Pets.getAll(res)
    }
       
    )
}