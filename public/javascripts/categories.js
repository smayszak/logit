$( document ).ready(function() {
    accountAccessor.updateMembers(pageAccessor);
    categoryAccessor.updateCategories(pageAccessor);
});

var pageAccessor = (function(){
    return {
        updateMembers: function(members){
            var currentUser = sessionStorage.getItem('current_user');
            for(var idx = 0; idx < members.length; idx++) {
                var tag ="<option  ";
                if(currentUser !== undefined && currentUser ==  members[idx]){
                    tag +="selected";
                }
                tag += ">" + members[idx] + "</option>";
                $("#owner").append(tag);
            }
        },
       updateCategories: function(data){
           console.log(data);
           for(var idx in data){
               pageAccessor.addItem(data[idx]);
           }
       },
       addItem: function(category){
           console.log(category);
           var item = "<div data-name='"+category+"'>X - "+category+"</div>";
           $("#categories").append(item);
       }
    };
})();
