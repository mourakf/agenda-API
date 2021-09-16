

module.exports = app => {
app.get('/atendimentos', (req, res) => {
    res.send("rota get")
})

app.post('/atendimentos', (req,res) => {
    console.log(req.body)
    const body = req.body
    res.send(`${body}`)
})
}