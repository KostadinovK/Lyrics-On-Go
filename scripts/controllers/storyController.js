const storyController = function(){
    const getCreate = function(context){
        const loggedIn = storage.getData('userInfo') !== null;
        context.loggedIn = loggedIn;

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        })
        .then(function(){
            this.partial('./views/posts/create.hbs');
        });
    }

    const postCreate = function(context){
        storyService.create(context.params);
        context.redirect('#/home');
    }

    return {
        getCreate,
        postCreate
    };
}();