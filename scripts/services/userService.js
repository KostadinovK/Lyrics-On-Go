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
        getUserDataFromId
    };
}();