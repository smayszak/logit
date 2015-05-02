$( document ).ready(function() {
    accountAccessor.updateMembers(pageAccessor);
    categoryAccessor.updateCategories(pageAccessor);
    $("#sendit").click(function(target){
        var category = $("#title").val();
        var owner = $("#owner").val();
        $("#title").val("");
        pageAccessor.saveNewCategory(category,owner);
        return false;
    });
});

var pageAccessor = (function(){
    return {
        category_list: undefined,
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
           category_list = data;
           console.log(category_list);
           for(var idx in category_list){
               pageAccessor.addItem(category_list[idx]);
           }
       },
        saveNewCategory: function(category, owner){
            category_list[category_list.length] = category;
            var newCategory = {category: category, owner:owner};
            $.ajax({
                url: "/category/create",
                data: newCategory,
                method: 'post'
            }).done(function(data) {
                console.log(data);
            });
            pageAccessor.addItem(category);
        },
       addItem: function(category){
           console.log(category);
           var item = "<div data-name='"+category+"'>"+category+"</div>";
           $("#categories").append(item);
       }
    };
})();
