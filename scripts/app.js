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

    /*Logout*/
    this.get('#/logout', userController.logout);

    /*Create a Story */
    this.get('#/post', storyController.getCreate);
    this.post('#/post', storyController.postCreate);

    /*Feed*/
    this.get('#/feed', storyController.getAllForFeed);
    
});

(() => {
    app.run('#/home');
})();