/**
 * Created by mayszaks on 5/1/15.
 */

var categoryAccessor = (function(){
    return {
        account: undefined,
        setAccount: function(accountsvc_ref){
            account = accountsvc_ref;
        },
        updateCategories: function(pageAccessor){
            $.ajax({
                url: "/category/list?user="+account.currentUser()
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