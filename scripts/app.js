const app = Sammy('#main', function(){
    this.use('Handlebars', 'hbs');

    /*Home*/
    this.get('#/home', homeController.getHome);
});

(() => {
    app.run('#/home');
})();