//const getDateApi = require('./database')
const connection = require('./database/database')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

// engine de visualização
app.set('view engine', 'ejs');
app.set('views', './views');

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Pega o conteudo da API
async function getDateApi() {
    return await fetch('https://alertrack.com.br/dev/rest_api/tester/')
        .then(response => response.json())
}

//Função que retorna o valor pronto para ser colocado no banco de dados
function dbtext(texto) {
    if (texto === undefined) {
        return null
    } else {
        return texto.replace('(', '').replace(')', '').replace('-', '').replace('-', '').replace('.', '').replace('.', '')
    }
}

//Metodos para adicionar os dados do JSON no banco de dados

//Verifica se existe algum dado no banco de dados. Se não existir nada o banco será preenchido com os dados do JSON
connection.query('SELECT * FROM employee', function (error, results, fields) {
    if (error) throw error;
    if (results[0] == undefined) {
        getDateApi()

            .then(data => {
                data.forEach(function (element, index) {
                    connection.query(`insert into employee (cpf, name, born_at, occupation) values ('${data[index].cpf} ','${dbtext(data[index].name)}', '${dbtext(data[index].born_at)}', '${dbtext(data[index].occupation)}') `)
                    connection.query(`insert into address (zipcode, number, complement, address_id) values('${dbtext(data[index].address[0].zipcode)}', '${data[index].address[0].number}', '${data[index].address[0].complement}', (SELECT id from employee where name = '${data[index].name}'))`)
                    connection.query(`insert into companies (companies_id, cnpj, name) values((SELECT id from employee where name = '${data[index].name}') ,'${dbtext(data[index].companies[0].cnpj)}', '${data[index].companies[0].name}')`)
                    connection.query(`insert into phones (phones_id, phone1, phone2, phone3) values((SELECT id from employee where name = '${data[index].name}') ,'${dbtext(data[index].phones[0])}', '${dbtext(data[index].phones[1])}', '${dbtext(data[index].phones[2])}')`)
                })
            }
            )
    }
});



//Envia o conteudo do banco de dados a pagina
app.get('/employee', (req, res) => {
    connection.query('SELECT * FROM employee', function (err, result, fields) {
        if (err) throw err;
        res.render('index.ejs', { data: result })
    })
})

//porta
app.listen(3000)
//localhost:3000/employee
