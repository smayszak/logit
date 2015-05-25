window.runPage = function(){
    debugLog('Account runPage: running page code');
    accountAccessor.updateMembers(pageAccessor);
};

$( document ).ready(function() {
    $("#add").click(function(src){
        debugLog('Account runPage: add clicked');
        var newUser = $("#name").val();
        debugLog('Account runPage: saving ' + newUser);
        pageAccessor.saveUser(newUser);
        return false;
    });
});

var pageAccessor = (function(){
    return {
        updateMembers: function(members){
            debugLog('Account pageAccessor: updating members');
            debugLog(members);
          for(var idx = 0; idx < members.length; idx++) {
             pageAccessor.addUser(members[idx]);
          }
      },
        updateActiveUser: function(e){
            debugLog('Account updateActiveUser: updating active user');
            var target = $(e);
            var name = target.data("name");

            debugLog('Account updateActiveUser: updating user to ' + name);
            accountAccessor.updateUser(e, false);

            $(".userlist").removeClass('selected-user');
            target.addClass('selected-user');
        },
        saveUser: function(newUser){
            debugLog('Account saveUser: saving new user ' + newUser);
            var accountId = accountAccessor.getAccountId();
            $.ajax({
                url: "/account/member/create?id=" + accountId,
                data: {member: newUser},
                method: 'post'
            }).done(function(data) {
                accountAccessor.updateUserList(data);
                pageAccessor.addUser(data);
            });
        },
        addUser: function(newUser){
            debugLog('Account addUser: adding new user');
            var currentUser = accountAccessor.getCurrentUser();
            var tag ="<div class='userlist ";
            if(currentUser !== undefined && currentUser.name ==  newUser.name){
                tag +="selected-user";
            }
            tag += "' onclick='pageAccessor.updateActiveUser(this);' data-name='"+newUser.name+"'>" +newUser.name+ "<div>";
            $("#members").append(tag);
        }
    };
})();