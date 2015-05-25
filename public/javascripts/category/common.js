/**
 * Created by mayszaks on 5/1/15.
 */

var categoryAccessor = (function(){
    return {
        accountSvc: undefined,
        setAccount: function(accountsvc_ref){
            debugLog('Category setAccount: setting service ref');
            accountSvc = accountsvc_ref;
        },
        updateCategories: function(pageAccessor){
            debugLog('Category updateCategories: updating categories');
            var current = accountSvc.getCurrentUser();
            debugLog('Category updateCategories:current user categories:');
            debugLog(current.categories);
            pageAccessor.updateCategories(current.categories);
        },
        defaultCategory: function(pageAccessor){
            debugLog('Category defaultCategory: setting default category');
            pageAccessor.defaultCategory(accountSvc.getDisplayCategory());
        }
    };
})();