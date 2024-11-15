const mysql= require('mysql2');

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'Negrijo16',
    database:'Agenda_Senai',
})

module.exports= pool;
