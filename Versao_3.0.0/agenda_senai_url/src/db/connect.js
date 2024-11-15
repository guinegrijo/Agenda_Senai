const mysql= require('mysql2');

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'alunods',
    password:'senai@604',
    database:'Agenda_Senai',
    timezone: 'Z', //GMT -3 (NOSSO HORARIO)
})

module.exports= pool;
