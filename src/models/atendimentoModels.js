const express = require('express')
const moment = require('moment');
moment.suppressDeprecationWarnings = true;
const conn = require('../config/connection')
class Service {
    createService(service, res) {
        const dataCriacao = moment().local().format('YYYY-MM-DD, h:mm:ss');
        const data = moment().local(service.data, 'DD/MM/YYYY').format('YYYY-MM-DD, h:mm:ss')
        
       
        const dtaValid = moment(data).isSameOrAfter(dataCriacao)
        const nameValid = service.cliente.length >= 3
        
        const validation = [{
            nome: 'data',
            valid: dtaValid,
            message: 'Data deve ser maior ou igual que a data atual'
        },
        {
            nome: 'cliente',
            valid: nameValid,
            message: "Nome do cliente deve ter pelo menos 3 caracteres"
        }
    
    ]
        //valida se há erros
        const erros = validation.filter(field => !field.valid)
        // quantia de erros
        const hasErrors = erros.length

        if(hasErrors) {
            res.status(400).json(erros)
        } 
        else {

        const atendimentoData = {
            ...service, dataCriacao, data
        }
        const insert = `INSERT INTO atendimentos SET ?`
        conn.query(insert, atendimentoData, (error, result) => {
            if(error) {
                res.status(400).json(error.sqlMessage)
            }
            else {
            console.log(result)
            const finalResult = ["id:" + result.insertId, service]
                res.status(201).json(finalResult)
            }
        })
    }

    }
    getService(id, res) {
        
        
        const select = `SELECT * FROM atendimentos WHERE id=${id}`
        conn.query(select, (error, result) => {
            // devolver um objeto
            const oneService = result[0]
            if(result.length > 0) {
                res.status(200).json(oneService)
                
            }
            else {
                res.status(400).json("Registro não existente")
            } 
        })
       
    }
    getAll(res) {
        const select = `SELECT * FROM atendimentos`
        conn.query(select, (error, result) => {
            if(result.length > 0) {
                
                res.status(200).json(result)
            }
             else {
                res.status(400).json(error)
                
            } 
        })
       
    }
    updateService(id,values,res) {
        if(values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD, h:mm:ss')
        }
        const updateSql = `UPDATE atendimentos SET ? WHERE id = ?`
        conn.query(updateSql, [values, id], (error, result) => {
            if(result) {
                res.status(200).json({...values, id})
            }
            else {
                console.log(error)
                res.status(400).json(error)
            }
        })
   
    
}
        deleteService(id, res) {
            const deleteSql = "DELETE FROM atendimentos where id= ?"
            conn.query(deleteSql, id, (error, result) => {
                if(result.affectedRows > 0){
                    
                    res.status(200).json({id})
                }
                else {
                    res.status(400).json("Registro não existente")
                }
            })
        }
    
}

module.exports = new Service