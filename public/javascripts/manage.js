$( document ).ready(function() {
     accountAccessor.updateMembers(pageAccessor);
});

var pageAccessor = (function(){
    return {
        updateMembers: function(members){
          var currentUser = sessionStorage.getItem('current_user');
          for(var idx = 0; idx < members.length; idx++) {
              var tag ="<div class='userlist ";
              if(currentUser !== undefined && currentUser ==  members[idx]){
                  tag +="selected-user";
              }
                tag += "' onclick='saveUser(this);' data-name='"+members[idx]+"'> X " +members[idx]+ "<div>";
              $("#members").append(tag);
          }
      }
    };
})();

function saveUser(e){
    var target = $(e);
    var name = target.data("name");
    $(".userlist").removeClass('selected-user');
    target.addClass('selected-user');
    sessionStorage.setItem('current_user', name);
    window.location = window.location;
}