module.exports = function(application) {

    application.get('/portfolio-investment', function(req, res){
        application.app.controllers.portfolio_investment.portfolio_investment(application, req, res);
    });
};