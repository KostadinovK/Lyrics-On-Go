const postDataController = function(){
    const getLikes = async function(context){
        let story = {};

        await storyService.loadStory(context.params.id)
        .then(response => response.json())
        .then(data => story = data);

        context.likeViews = [];

        for (const id of story.likes) {
            let {gender, username} = await userService.getUserDataFromId(id);
            let isMale = helper.isGenderMale(gender);
            context.likeViews.push({isMale, username});
        }

        context.loadPartials({
            likeView: './views/postData/likeView.hbs'
        }).then(function(){
            this.partial('./views/postData/likes.hbs');
        });
    }
    
    return {
        getLikes
    }
}();