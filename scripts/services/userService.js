const userService = function(){

    const baseUrl = `https://baas.kinvey.com/user/${storage.appKey}`;

    const register = function(params){
        const url = baseUrl;
        let user = {
            username: params.username,
            password: params.password,
            gender: params.gender
        }

        storage.saveUserBasicCredentials(user.username, user.password);

        const headers = {
            headers: {
                Authorization: storage.getUserBasicCredentials()
            },
            body: JSON.stringify(user)
        };
    
        return requester.post(url, headers);
    }

    const login = function(params){
        const url = baseUrl + '/login';

        storage.saveUserBasicCredentials(params.username, params.password);

        const headers = {
            headers: {
                Authorization: storage.getUserBasicCredentials()
            },
            body: JSON.stringify({...params})
        };

        return requester.post(url, headers);
    }

    const logout = function(){
        const url = baseUrl + '/_logout';
        
        let headers = {
            headers: {
                Authorization: `Kinvey ${storage.getData('authToken')}`
            }
        };

        return requester.post(url, headers);
    }

    const update = function(user){
        const url = baseUrl + `/${JSON.parse(storage.getData('userInfo'))._id}`;

        const headers = {
            headers: {
                Authorization: `Kinvey ${JSON.parse(storage.getData('authToken'))}`
            },
            body: JSON.stringify(user)
        }

        return requester.put(url, headers);
    }

    const getProfile = async function(userId, context){

        let {username, gender} = await getUserDataFromId(userId);
        
        await storyService.loadAll()
        .then(response => response.json())
        .then(stories => {

            context.username = username
            context.posts = stories.filter(s => s._acl.creator === userId);
            context.storiesCount = context.posts.length;
            context.gender = gender;
            context.isMale = helper.isGenderMale(context.gender);

            for (let story of stories) {
                story.isCreator = story._acl.creator === JSON.parse(storage.getData('userInfo'))._id;
                story.isCreatorMale = helper.isGenderMale(story.creatorGender);
                story.notLiked = !story.likes.includes(userId);
                story.likesCount = story.likes.length;
                story.creatorId = story._acl.creator;
                story.commentsCount = story.comments.length;
                story.timeAgo = helper.calculateDateDifference(story.date, helper.getCurrentDate()) + ' ago';
                story.wordsCount = story.content.split(' ').length;
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

    const getUserDataFromId = async function(userId){
        const url = baseUrl + `/${userId}`;
        const headers = {
            headers: {
                Authorization: storage.getUserBasicCredentials()
            }
        }

        let res = {};

        await requester.get(url, headers)
        .then(response => response.json())
        .then(data => res = data);

        return res;
    }

    return {
        register,
        login,
        logout,
        update,
        getProfile,
        getUserDataFromId
    };
}();