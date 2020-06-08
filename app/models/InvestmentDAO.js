//Código responsável por gerenciar todas as consultas da aplicação ao banco de dados
function InvestmentDAO(connection) {
    this._connection = connection;
}

InvestmentDAO.prototype.getInvestments = function(callback){
    this._connection.query("SELECT symbol, SUM(invested) AS 'invested' FROM investments GROUP BY(symbol);", callback);
}

InvestmentDAO.prototype.saveInvestment = function(investment, callback){
    console.log(investment);
    this._connection.query('INSERT INTO investments set ? ', investment, callback);
}

module.exports = function(app) {
    return InvestmentDAO;
}