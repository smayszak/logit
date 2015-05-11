
$( document ).ready(function() {
    categoryAccessor.setAccount(accountAccessor);
    var loadComplete = function(){
        console.log('load callback');
        var user = accountAccessor.currentUser();
        if(user != null){
            $('#active-user').append(user);
            accountAccessor.updateMembers(homePageAccessor);
        }
        $("#menu").click(function(){
            $("#menu_flyout").toggle('hide-it');
        });
        $("#menu_users").click(function(){
            $("#user_flyout").toggle('hide-it');
        });
    }
    accountAccessor.load(loadComplete);

});


window.zeroPadded = function(val) {
    if (val >= 10)
        return val;
    else
        return '0' + val;
}

var homePageAccessor = (function(){
    return {
        updateMembers: function(users){
            for(var idx = 0; idx < users.length; idx++){
                var tag ="<li onclick='accountAccessor.updateUser(this);' data-name='"+users[idx]+"'>" +users[idx]+ "</li>";
                $("#user_flyout ul").append(tag);
            }
        }
    };
})();


