module.exports.portfolio_investment = function (application, req, res){
    var connection = application.config.dbConnection();
    var portfolioInvestmentModel = new application.app.models.InvestmentDAO(connection);

    portfolioInvestmentModel.getInvestments(function(error, result){
        console.log(result);
        res.render('investment/portfolio_investment', {investments : {investments_list: result, total_amount:0}});
    });
};