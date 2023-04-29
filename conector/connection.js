const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Vargascalle1!',
  database: 'corporation_db'
});

module.exports = connection;


connection.connect;
console.log("abierta")