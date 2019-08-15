const app = Sammy('#main', function(){
    this.use('Handlebars', 'hbs');

    this.get('#/home', function(context){
        this.partial('../views/home/home.hbs');
    });
});

(() => {
    app.run('#/home');
})();