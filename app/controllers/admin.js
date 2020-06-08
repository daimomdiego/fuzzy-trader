//Código responsável por gerenciar todas as operações mais complexas da aplicação.
module.exports.form_add_investment = function(application, req, res){
    var value = req.query.value;
    getInvestmentOptions(value, function (investments){
        console.log(investments);
        res.render("admin/form_add_investment", {investment_data: {investment_value: value, investments_options:investments}});
    });
    //Utilizando as funções como parâmetro, a renderização da página só vai acontecer após a resposta assíncrona de todas as requisições.
};

module.exports.investment_save = function(application, req, res){
    var investment = req.body;

    var connection = application.config.dbConnection();
    var investmentModel = new application.app.models.InvestmentDAO(connection);

    investmentModel.saveInvestment(investment, function(error, result){
        res.redirect('/');
    });
};

function getInvestmentOptions(value, callback){

    //Apenas 3 criptomoedas foram inseridas nas consultas à outra API dentro da aplicação.
     getCryptoCurrency(value, "LTCUSD", function(ltcResultJson){
        getCryptoCurrency(value, "BTCUSD", function(btcResultJson){
            getCryptoCurrency(value, "ETHGBP", function(ethResultJson){
                var investmentsOptions = [];
                investmentsOptions.push(ltcResultJson);
                investmentsOptions.push(btcResultJson);
                investmentsOptions.push(ethResultJson);
                callback(investmentsOptions);
            });
        });
     });
}

function getCryptoCurrency(value, cryptoCurrency, callback){

    var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + cryptoCurrency;
    var headers = { "x-ba-key": "YzlhZDBlZGM2ZjViNGQ3NGEzMmU0MDBlZDI4MzNlYjQ" };

    getJSON(value, url, headers, callback);
}

var getJSON = function(value, url, headers, callback) {
    
    var Request = require("request");

    Request.get({
        "headers": headers,
        "url": url
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        var _resultJSON = JSON.parse(body);
        var _parsedValue = parseFloat(value);
        _resultJSON.acquired_amount = _parsedValue / (_resultJSON.last * _parsedValue);
        callback(_resultJSON);
        //Após garantir o resultado de todas as requisições, finalmente a renderização da página acontece.
    });
};