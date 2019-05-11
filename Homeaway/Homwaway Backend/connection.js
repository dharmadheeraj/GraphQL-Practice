var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 800,
    port: '3306',
    host: '127.0.0.1',
    user: 'homeaway_user',
    password: 'Homeaway.99',
    database: 'homeaway_user'
})

module.exports = pool;