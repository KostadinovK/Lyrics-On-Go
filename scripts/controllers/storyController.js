const storyController = function(){
    
    const splitStoryContentInParagraphs = function(story){
        let paragraphs = story.content.split('\n').filter(p => p.length > 1);
        
        return paragraphs.reduce((text, p) => text += ('<p>' + p + '</p>'), "");
    }

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
            for (let story of stories) {
                story.isCreator = story._acl.creator === JSON.parse(storage.getData('userInfo'))._id;
                story.creatorId = story._acl.creator;
                story.isCreatorMale = helper.isGenderMale(story.creatorGender);
                story.notLiked = !story.likes.includes(JSON.parse(storage.getData('userInfo'))._id);
                story.likesCount = story.likes.length;
                story.timeAgo = helper.calculateDateDifference(story.date, helper.getCurrentDate()) + ' ago';
                story.wordsCount = story.content.split(' ').length;
                story.commentsCount = story.comments.length;
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

    const getDetails = async function(context){
        const loggedIn = storage.getData('userInfo') !== null;
        context.loggedIn = loggedIn;

        await storyService.loadStory(context.params.id)
        .then(response => response.json())
        .then(story => {
            context.story = story;
            story.content = splitStoryContentInParagraphs(story);
            story.isCreator = story._acl.creator === JSON.parse(storage.getData('userInfo'))._id;
            story.creatorId = story._acl.creator;
            story.commentsCount = story.comments.length;
            story.isCreatorMale = helper.isGenderMale(story.creatorGender);
            story.notLiked = !story.likes.includes(JSON.parse(storage.getData('userInfo'))._id);
            story.likesCount = story.likes.length;
            story.timeAgo = helper.calculateDateDifference(story.date, helper.getCurrentDate()) + ' ago';
            story.wordsCount = story.content.split(' ').length;
        });

        await context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
        })
        .then(function(){
            this.partial('./views/posts/details.hbs');
        });
    }

    const getDelete = function(context){

        storyService.deleteStory(context.params.id)
        .then(response => response.json())
        .then(data => {
            context.redirect('#/profile');
        });
    }

    const getEdit = async function(context){
        context.loggedIn = storage.getData('userInfo') !== null;

        await storyService.loadStory(context.params.id)
        .then(response => response.json())
        .then(story => {
            context.story = story;
            storage.saveData('storyComments', story.comments);
        });
    
        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function(){
            this.partial('./views/posts/edit.hbs');
        });
    }

    const postEdit = function(context){
        
        const story = {
            title: context.params.title,
            content: context.params.content,
            likes: helper.formatStoryLikesString(context.params.likes),
            comments: JSON.parse(storage.getData('storyComments')),
            date: context.params.date,
            creatorUsername: context.params.username,
            creatorGender: context.params.gender
        }
    
        storage.deleteData('storyComments');
        storyService.edit(context.params.id, story)
        .then(response => response.json())
        .then(data => {
            context.redirect('#/profile');
        });
    }

    const like = async function(context){
        let story = {};

        await storyService.loadStory(context.params.id)
        .then(response => response.json())
        .then(data => story = data);
        
        const id = JSON.parse(storage.getData('userInfo'))._id;

        if(story.likes.includes(id)){
            story.likes = story.likes.filter(ID => ID !== id);
        }else{
            story.likes.push(id);
        }
        
        storyService.edit(context.params.id, story)
        .then(response => response.json())
        .then(data => {
            context.redirect(`#/stories/${context.params.id}`);
        });
    }

    return {
        getCreate,
        postCreate,
        getAllForFeed,
        getDetails,
        getDelete,
        getEdit,
        postEdit,
        like
    };
}();