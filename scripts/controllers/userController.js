const userController = function(){

    const isDataValid = function(params){
        if(params.username.length < 2
            || params.password.length < 2
            || params.password !== params.rePassword
            || !['male', 'female', 'Male', 'Female', 'm', 'f', 'M', 'F'].includes(params.gender)){
                return false;
        }

        return true;
    }

    const getRegister = function(context){
        const loggedIn = storage.getData('userInfo') !== null;
        context.loggedIn = loggedIn;

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        })
        .then(function(){
            this.partial('./views/user/register.hbs');
        });
    }

    const getLogin = function(context){
        const loggedIn = storage.getData('userInfo') !== null;
        context.loggedIn = loggedIn;

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        })
        .then(function(){
            this.partial('./views/user/login.hbs');
        });
    }

    const postRegister = function(context){

        if(!isDataValid(context.params)){
            return;
        }
        
        userService.register(context.params)
        .then(response => response.json())
        .then(data => {
            storage.saveUser(data);
            context.redirect('#/home');
        });
    }

    const postLogin = function(context){
        userService.login(context.params)
        .then(response => response.json())
        .then(data => {
            storage.saveUser(data);
            context.redirect('#/home');
        });
    }

    const logout = function(context){
        userService.logout()
        .then(response => response.json())
        .then(data => {
            storage.deleteUser();
            context.redirect('#/home');
        });
    }

    const getProfile = async function(context){
        const loggedIn = storage.getData('userInfo') !== null;
        context.loggedIn = loggedIn;

        await storyService.loadAll()
        .then(response => response.json())
        .then(stories => {

            context.username = JSON.parse(storage.getData('userInfo')).username;
            context.posts = stories.filter(s => s._acl.creator === JSON.parse(storage.getData('userInfo'))._id);
            context.storiesCount = context.posts.length;
            context.gender = JSON.parse(storage.getData('userInfo')).gender;
            context.isMale = helper.isGenderMale(context.gender);

            for (let story of stories) {
                story.isCreator = story._acl.creator === JSON.parse(storage.getData('userInfo'))._id;
                story.isCreatorMale = helper.isGenderMale(story.creatorGender);
                story.likesCount = story.likes.length;
                story.timeAgo = helper.calculateDateDifference(story.date, helper.getCurrentDate()) + ' ago';
            }
        });

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
            userPosts: './views/user/userPosts.hbs',
            profileInfo: './views/user/profileInfo.hbs',
            post: './views/posts/post.hbs'
        })
        .then(function(){
            this.partial('./views/user/profile.hbs');
        });
    }

    return {
        getRegister,
        getLogin,
        postRegister,
        postLogin,
        logout,
        getProfile
    };
}();