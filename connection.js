const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kimba',
  database: 'employee_db'
},
  console.log("connected to employee_db"));

connection.connect( function (err) {
  if (err) throw err;

});

module.exports = connection;