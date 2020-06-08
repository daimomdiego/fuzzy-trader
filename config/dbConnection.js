//Arquivo de configuração do banco de dados
var mysql = require('mysql');

var connMySQL = function (){
    var connection = mysql.createConnection({
        host :  'localhost',
        user : 'root',
        password: '1234',
        database : 'fuzzy_trader'
    });

    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
    });

    return connection;
}

module.exports = function() {
    return connMySQL;
};

        