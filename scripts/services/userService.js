const userService = function(){

    const baseUrl = `https://baas.kinvey.com/user/${storage.appKey}`;

    const register = function(params){
        const url = baseUrl;

        const user = {
            username: params.username,
            password: params.password,
            gender: params.gender
        }

        const auth = btoa(`${storage.appKey}:${storage.appSecret}`);
        const authString = `Basic ${auth}`;

        const headers = {
            header: {
                Authorization: authString
            },
            body: JSON.stringify(user)
        };

        return requester.post(url, headers);
    }

    const login = function(params){
        const url = baseUrl + '/login';

        const auth = btoa(`${params.username}:${params.password}`);
        const authString = `Basic ${auth}`;

        const headers = {
            header: {
                Authorization: authString
            },
            body: JSON.stringify({...params})
        };

        return requester.post(url, headers);
    }

    const logout = function(){
        const url = baseUrl + '/_logout';

        const headers = {
            header: {
                Authorization = `Kinvey ${storage.getData('authToken')}`
            }
        };

        return requester.post(url, headers);
    }

    const update = function(user){
        const url = baseUrl + `/${JSON.parse(storage.getData('userInfo'))._id}`;

        const headers = {
            header: {
                Authorization = `Kinvey ${storage.getData('authToken')}`
            },
            body: JSON.stringify(user)
        }

        return requester.put(url, headers);
    }

    return {
        register,
        login,
        logout,
        update
    };
}();