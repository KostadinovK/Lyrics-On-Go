const storage = function(){

    const appKey = 'kid_ryjXFiM4r';
    const appSecret = '14ca8fcd822645268ecc71f3aa2391ca';

    const usersCollection = 'users';
    const dataCollection = 'stories';

    const saveData  = function(key, value){value
        localStorage.setItem(key, JSON.stringify(value));
    }

    const getData = function(key){
        return localStorage.getItem(key);
    }

    const deleteData = function(key){
        localStorage.removeItem(key);
    }

    const saveUser = function(data){
        saveData('userInfo', data);
        saveData('authToken', data._kmd.authtoken);
    }

    const deleteUser = function(){
        deleteData('userInfo');
        deleteData('authToken');
    }

    return {
        appKey,
        appSecret,
        usersCollection,
        dataCollection,
        saveData,
        getData,
        deleteData,
        saveUser,
        deleteUser
    };
}();