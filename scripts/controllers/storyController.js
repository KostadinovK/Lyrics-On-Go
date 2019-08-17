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
        storyService.create(context.params)
        .then(function(){
            context.redirect('#/home');
        });
    }

    const getAllForFeed = async function(context){
        const loggedIn = storage.getData('userInfo') !== null;
        context.loggedIn = loggedIn;
        
        await storyService.loadAll()
        .then(response => response.json())
        .then(stories => {
            context.posts = stories.filter(s => s._acl.creator !== JSON.parse(storage.getData('userInfo'))._id);
            for (const story of stories) {
                story.isCreator = story._acl.creator === JSON.parse(storage.getData('userInfo'))._id;
                story.isCreatorMale = helper.isStoryCreatorMale(story.creatorGender);
                story.likesCount = story.likes.length;
                story.timeAgo = helper.calculateDateDifference(story.date, helper.getCurrentDate()) + ' ago';
            }
        });

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
            post: './views/posts/post.hbs'
        })
        .then(function(){
            this.partial('./views/posts/posts.hbs');
        });
    }

    return {
        getCreate,
        postCreate,
        getAllForFeed
    };
}();