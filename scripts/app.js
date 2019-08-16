const app = Sammy('#main', function(){
    this.use('Handlebars', 'hbs');

    /*Home*/
    this.get('#/home', homeController.getHome);

    /*Register*/
    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    /*Login*/
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);
});

(() => {
    app.run('#/home');
})();