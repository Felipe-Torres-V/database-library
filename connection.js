const mysql = require('mysql')

const connected = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'biblioteca',
    port : '3306'
});

connected.connect(function(err) {
    if (err) throw err;
    console.log('Connected.');
});

exports.connected = connected;