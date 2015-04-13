
$( document ).ready(function() {
    var user = currentUser();
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
                var tag ="<li onclick='updateUser(this);' data-name='"+users[idx]+"'>" +users[idx]+ "</li>";
                $("#user_flyout ul").append(tag);
            }
        }
    };
})();

var categoryAccessor = (function(){
    return {
        updateCategories: function(pageAccessor){
            $.ajax({
                url: "/category/list?user="+currentUser()
            }).done(function(data) {
                pageAccessor.updateCategories(data.categories);
            });
        },
        defaultCategory: function(pageAccessor){
            $.ajax({
                url: "/category/default"
            }).done(function(data) {
                pageAccessor.defaultCategory(data);
            });
        }
    };
})();

var accountAccessor = (function(){
    return {
        updateMembers: function(pageAccessor){
            $.ajax({
                url: "/account/members"
            }).done(function(data) {
                pageAccessor.updateMembers(data);
            });
        }
    };
})();

function updateUser(e){
    var target = $(e);
    var name = target.data("name");
    $('#active-user').empty();
    $('#active-user').append(name);
    sessionStorage.setItem('current_user', name);
    window.location = window.location;
}

function currentUser(){
    var user = sessionStorage.getItem('current_user');
    if( user != null){
        return user;
    }
    return '';''
}