//Rotas acessadas pelo navegador do usuário. As interações vindas do navegador por meio de requests geram alterações que são solicitadas aos controllers
module.exports = function(application) {
    
    application.get('/add-investment', function(req, res){
        application.app.controllers.admin.form_add_investment(application, req, res);
    });

    application.post('/investment/save', function(req, res){
        application.app.controllers.admin.investment_save(application, req, res);
    });
};