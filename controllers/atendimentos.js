const Service = require('../models/atendimentoModels')

module.exports = app => {
    app.get('/atendimentos/:id', (req, res) => {
    const serviceId = parseInt(req.params.id)
    
    Service.getService(serviceId, res)
    
    })

    app.get('/atendimentos/', (req,res) => {
    Service.getAll(res)
    
    })

    app.post('/atendimentos', (req,res) => {
    const services = req.body
    
    Service.createService(services, res)
    })

    app.patch('/atendimentos/:id', (req,res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Service.updateService(id,values, res)
    })

    app.delete('/atendimentos/:id', (req,res) => {
        const id = parseInt(req.params.id)
        Service.deleteService(id, res)

    })
}