const helper = function(){

    const createDate = function(dateString){
        let date = dateString.split('-');
        let time = date[1].split(':');
        let [hours, minutes] = time;
        
        let dayInMonth = date[0].split('/');
        let [day, month, year] = dayInMonth;

        return new Date(year, month - 1, day, hours, minutes);
    }

    const getCurrentDate = function () {
        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        let hh = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');

        date = dd + '/' + mm + '/' + yyyy + '-' + hh + ':' + minutes;
        
        return date;
    }

    const calculateDateDifference = function(oldDateString, newDateString){
        let oldDate = createDate(oldDateString);
        let newDate = createDate(newDateString);
        const diffTimeMilliSeconds = Math.abs(newDate.getTime() - oldDate.getTime());
        let diffTime = diffTimeMilliSeconds / (1000 * 60 * 60 * 24); //In Days

        if(diffTime < 1) {
            diffTime = diffTimeMilliSeconds / (1000 * 60 * 60); //In Hours
            
            if(diffTime < 1){
                diffTime = diffTimeMilliSeconds / (1000 * 60); //In Minutes

                return Math.ceil(diffTime) + ' minutes';
            }

            return Math.ceil(diffTime) + ' hours';
        }

        return Math.ceil(diffTime) + ' days';
    }

    const isStoryCreatorMale = function(gender){
        if(gender !== 'Male' && gender !== 'male' && gender !== 'M' && gender !== 'm'){
            return false;
        }

        return true;
    }

    return {
        getCurrentDate,
        calculateDateDifference,
        isStoryCreatorMale
    };
}();