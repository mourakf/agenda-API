class Tables {
    init(conn) {
        // instanciar no escopo
        this.conn = conn
// estabeler criação do schema
        this.createService()
    }
    createService() {
        const createSchema = `CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL
            AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20),
            servico varchar(20) NOT NULL,
            data datetime NOT NULL, dataCriacao datetime NOT NULL,
            status varchar(20) NOT NULL,
            observacoes text, PRIMARY KEY(id))`
            
        this.conn.query(createSchema, (erro) => {
            if(erro){
                console.log(erro)
            }
        })
    }
}

module.exports = new Tables