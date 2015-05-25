window.runPage = function(){
    debugLog("Category runPage: loading data");
    categoryAccessor.updateCategories(pageAccessor);
    $("#sendit").click(function(target){
        debugLog("Category runPage: preparing to save new category");
        var category = $("#title").val();
        var ownerName = $("#active-user").text();
        var accountId = accountAccessor.getAccountId();
        $("#title").val("");
        pageAccessor.saveNewCategory(category,ownerName, accountId);
        return false;
    });
};

var pageAccessor = (function(){
    return {
        category_list: undefined,
       updateCategories: function(data){
           debugLog("Category updateCategories: received category data");
           category_list = data;
           debugLog(category_list);
           for(var idx in category_list){
               pageAccessor.addItem(category_list[idx]);
           }
       },
        saveNewCategory: function(category, ownerName, accountId){
            debugLog("Category saveNewCategory: saving new category");
            category_list[category_list.length] = category;
            var newCategory = {category: category, owner:ownerName, accountId: accountId};
            $.ajax({
                url: "/category/create",
                data: newCategory,
                method: 'post'
            }).done(function(data) {
                debugLog("Category saveNewCategory: received server response");
                debugLog(data);
                var member = $("#active-user").text();
                accountAccessor.updateCategoryForMember(data, member);
                category_list.push(data);
                pageAccessor.addItem(data);
            });

        },
       addItem: function(category){
           debugLog("Category addItem: adding new item");
           debugLog(category);
           var item = "<div data-id='"+category.id+"'>"+category.name+"</div>";
           $("#categories").append(item);
       }
    };
})();
