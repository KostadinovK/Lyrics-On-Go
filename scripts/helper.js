const helper = function(){
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

    return {
        getCurrentDate
    };
}();