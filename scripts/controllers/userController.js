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

    return {
        getRegister,
        getLogin,
        postRegister
    };
}();