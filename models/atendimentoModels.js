const express = require('express')
const moment = require('moment');
moment.suppressDeprecationWarnings = true;
const conn = require('../config/connection')
class Service {
    createService(service, res) {
        const dataCriacao = moment().local().format('YYYY-MM-DD, h:mm:ss');
        const data = moment().local(service.data, 'DD/MM/YYYY').format('YYYY-MM-DD, h:mm:ss')
        console.log(dataCriacao)
       
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
                res.status(201).json(result.insertId)
            }
        })
    }

    }
    getService(id, res) {
        
        
        const select = `SELECT * FROM atendimentos WHERE id=${id}`
        conn.query(select, (error, result) => {
            // devolver um objeto
            const oneService = result[0]
            if(result) {
                res.status(200).json(oneService)
                
            }
            else {
                res.status(400).json(error)
            } 
        })
       
    }
    getAll(res) {
        const select = `SELECT * FROM atendimentos`
        conn.query(select, (error, result) => {
            if(result) {
                
                res.status(200).json(result)
            }
             else {
                res.status(400).json(error)
                
            } 
        })
       
    }

   
    
}

module.exports = new Service