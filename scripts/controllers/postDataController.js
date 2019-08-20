const postDataController = function(){
    
    const getLikes = async function(context){
        context.loggedIn = storage.getData('userInfo') !== null;
        let story = {};

        await storyService.loadStory(context.params.id)
        .then(response => response.json())
        .then(data => story = data);

        context.likeViews = [];

        for (const id of story.likes) {
            let {gender, username} = await userService.getUserDataFromId(id);
            let isMale = helper.isGenderMale(gender);
            context.likeViews.push({id, isMale, username});
        }

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
            likeView: './views/postData/likeView.hbs'
        }).then(function(){
            this.partial('./views/postData/likes.hbs');
        });
    }
    
    return {
        getLikes
    }
}();