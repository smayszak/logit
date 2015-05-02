/**
 * Created by mayszaks on 5/1/15.
 */
var accountAccessor = (function(){
    return {
        updateMembers: function(pageAccessor){
            $.ajax({
                url: "/account/members"
            }).done(function(data) {
                pageAccessor.updateMembers(data);
            });
        },
        currentUser: function(){
            var user = sessionStorage.getItem('current_user');
            if( user != null){
                return user;
            }
            return '';''
        },
        updateUser: function(e, optionalRefresh){
            var target = $(e);
            var name = target.data("name");
            $('#active-user').empty();
            $('#active-user').append(name);
            sessionStorage.setItem('current_user', name);
            if(optionalRefresh == true || optionalRefresh == undefined) {
                window.location = window.location;
            }
        }
    };
})();