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

    /*Profile*/
    this.get('#/profile', userController.getProfile);

    /*Create a Story */
    this.get('#/post', storyController.getCreate);
    this.post('#/post', storyController.postCreate);

    /*Feed*/
    this.get('#/feed', storyController.getAllForFeed);

    /*Story Details*/
    this.get('#/stories/:id', storyController.getDetails);
    
});

(() => {
    app.run('#/home');
})();