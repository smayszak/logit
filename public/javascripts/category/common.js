/**
 * Created by mayszaks on 5/1/15.
 */

var categoryAccessor = (function(){
    return {
        account: undefined,
        setAccount: function(accountsvc_ref){
            debugLog('Category setAccount: settting service ref');
            account = accountsvc_ref;
        },
        updateCategories: function(pageAccessor){
            debugLog('Category updateCategories: updating categories');
            $.ajax({
                url: "/category/list?user="+account.currentUser()
            }).done(function(data) {
                debugLog('Category updateCategories: response for category list will update');
                pageAccessor.updateCategories(data.categories);
            });
        },
        defaultCategory: function(pageAccessor){
            $.ajax({
                url: "/category/default"
            }).done(function(data) {
                debugLog('Category defaultCategory: setting default category');
                pageAccessor.defaultCategory(data);
            });
        }
    };
})();