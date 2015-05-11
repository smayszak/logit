$( document ).ready(function() {
     accountAccessor.updateMembers(pageAccessor);

    $("#add").click(function(src){
        var newUser = $("#name").val();
        pageAccessor.saveUser(newUser);
        return false;
    });
});

var pageAccessor = (function(){
    return {
        updateMembers: function(members){
          for(var idx = 0; idx < members.length; idx++) {
             pageAccessor.addUser(members[idx]);
          }
      },
        updateActiveUser: function(e){
            var target = $(e);
            var name = target.data("name");

            accountAccessor.updateUser(e, false);

            $(".userlist").removeClass('selected-user');
            target.addClass('selected-user');
        },
        saveUser: function(newUser){
            pageAccessor.addUser(newUser);
            accountAccessor.updateUserList(newUser);
            $.ajax({
                url: "/account/member/create",
                data: newUser,
                method: 'post'
            }).done(function(data) {
                console.log(data);
            });
        },
        addUser: function(newUser){

            var currentUser = accountAccessor.currentUser();
            var tag ="<div class='userlist ";
            if(currentUser !== undefined && currentUser ==  newUser){
                tag +="selected-user";
            }
            tag += "' onclick='pageAccessor.updateActiveUser(this);' data-name='"+newUser+"'>" +newUser+ "<div>";
            $("#members").append(tag);
        }

    };
})();