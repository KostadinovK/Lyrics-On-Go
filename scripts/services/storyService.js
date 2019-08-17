const storyService = function(){

    const baseUrl = `https://baas.kinvey.com/appdata/${storage.appKey}/${storage.dataCollection}`;

    const isDataValid = function(params){
        if(params.title.length < 2 || params.content.length < 2){
            return false;
        }

        return true;
    }

    const create = function(params){
        if(!isDataValid(params)){
            return;
        }
        
        const url = baseUrl;

        const story = {
            title: params.title,
            content: params.content,
            likes: [],
            date: helper.getCurrentDate(),
            creatorUsername: JSON.parse(storage.getData('userInfo')).username,
            creatorGender: JSON.parse(storage.getData('userInfo')).gender
        }

        const headers = {
            headers: {
                Authorization: `Kinvey ${JSON.parse(storage.getData('authToken'))}`
            },
            body: JSON.stringify(story)
        }
        
        return requester.post(url, headers);
    }

    const loadAll = function(){
        const url = baseUrl;

        const headers = {
            headers: {
                Authorization: `Kinvey ${JSON.parse(storage.getData('authToken'))}`
            }
        }
        
        return requester.get(url, headers);
    }

    return {
        create,
        loadAll
    }
}();