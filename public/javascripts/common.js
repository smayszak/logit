
$( document ).ready(function() {
    $("#logout").click(function(evt){
        accountAccessor.logOut();
    });
    categoryAccessor.setAccount(accountAccessor);
    var loadComplete = function(hasAccount){
        if(!hasAccount){
            //if we are on the register page, fine, otherwise go to the sign in page.
            if(window.location.href.endsWith('/account/register')){
                return;
            }
            if(!window.location.href.endsWith('/')){
                window.location = '/';
            }
            debugLog("we dont have an account, not much to do, wait for a good registration");
            return;
        }
        debugLog('Common: account established, resuming');
        var user = accountAccessor.getCurrentUser();
        if(user != null){
            debugLog('Common: have a current user setting menu');
            console.log(user);
            accountAccessor.updateMembers(menuAccessor);
            $('#active-user').append(user.name);
        }else{
            debugLog('Common: did not set current user');
        }
        $("#menu").click(function(){
            $("#menu_flyout").toggle('hide-it');
        });
        $("#menu_users").click(function(){
            $("#user_flyout").toggle('hide-it');
        });
        if(window.pageLoadRegister.length > 0){
            for(var pageIndex = 0; pageIndex < pageLoadRegister.length; pageIndex++){
                pageLoadRegister[pageIndex]();
            }
        }
    }
    accountAccessor.load(loadComplete);

});

window.registerPageLoad = function(pageFunction){
    window.pageLoadRegister.push(pageFunction);
}
window.pageLoadRegister = [];

window.debug = true;
window.debugLog = function(message){
    if(window.debug == true){
        console.log(message);
    }
}

window.getJsonFromLocal = function(key){
    debugLog('getJsonFromLocal retrieving:'+key);
    //check for an expiration
    var expires = localStorage.getItem(key+"-expire");
    var expired = false;
    if(expires == undefined) {
        debugLog('getJsonFromLocal not an expiring key');
        expired = false;
    }else{
        debugLog('getJsonFromLocal key expires');
        var date = new Date(parseInt(expires));
        var now = new Date();
        if(now > date){
            debugLog('getJsonFromLocal expired, removing data');
            expired = true;
            localStorage.removeItem(key+"-expire");
            localStorage.removeItem(key);
        }else{
            debugLog('getJsonFromLocal key still valid');
        }
    }
    if(expired == true)
        return undefined;

    var data = localStorage.getItem(key);
    if(data == undefined) {
        debugLog('I couldnt find:'+key)
        return data;
    }
    return JSON.parse(data);

};

window.setJsonToLocal = function(key, data, optionHoursToExpire){
    localStorage.setItem(key, JSON.stringify(data));
    if(optionHoursToExpire != null) {
        var date = new Date();
        date = date.setHours(date.getHours() + optionHoursToExpire);
        localStorage.setItem(key +"-expire", date);
    }
};

window.getJsonFromSession = function(key){
    var data = sessionStorage.getItem(key);
    if(data == undefined)
        return data;
    return JSON.parse(data);

};

window.setJsonToSession = function(key, data){
    sessionStorage.setItem(key, JSON.stringify(data));
};

window.zeroPadded = function(val) {
    if (val >= 10)
        return val;
    else
        return '0' + val;
}

var menuAccessor = (function(){
    return {
        updateMembers: function(users){
            debugLog('Common: Updating Members')
            for(var idx = 0; idx < users.length; idx++){
                var tag ="<li onclick='accountAccessor.updateUser(this);' data-name='"+users[idx].name+"'>" +users[idx].name+ "</li>";
                debugLog(tag);
                $("#user_flyout ul").append(tag);
            }
        }
    };
})();


