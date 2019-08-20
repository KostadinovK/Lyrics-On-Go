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

    /* Display user Profile*/
    this.get('#/profile/:id', userController.getUserProfile);

    /*Create a Story */
    this.get('#/post', storyController.getCreate);
    this.post('#/post', storyController.postCreate);

    /*Feed*/
    this.get('#/feed', storyController.getAllForFeed);

    /*Story Details*/
    this.get('#/stories/:id', storyController.getDetails);

    /*Delete Story*/
    this.get('#/stories/:id/delete', storyController.getDelete);

    /*Edit Story*/
    this.get('#/stories/:id/edit', storyController.getEdit);
    this.post('#/stories/:id/edit', storyController.postEdit);

    /*Like Story*/
    this.get('#/stories/:id/like', storyController.like);

    /*Display All Story Likes*/
    this.get('#/stories/:id/likes', postDataController.getLikes);

    /*Display All Story Comments*/
    this.get('#/stories/:id/comments', postDataController.getComments);

    /*Comment a Story*/
    this.post('#/stories/:id/comment', postDataController.postComment);
    
});

(() => {
    app.run('#/home');
})();