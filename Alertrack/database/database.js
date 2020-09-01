const mysql = require('mysql')
const fetch = require('isomorphic-fetch')

//Faz a conecção com o banco de dados (para funcionar é preciso ja ter executado o arquivo sql)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'alertracksolution'
})

module.exports = connection
