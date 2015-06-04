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
            var defaultCategory = '';
            var categories = window.getJsonFromSession('category');
            var d = new Date();
            var tz = ((d).getTimezoneOffset())/60;
            var offset = (d.getHours() + tz);
            if(offset > 23){
                offset = offset - 23;
            }
            debugLog('Category defaultCategory: current time offset:' + offset);
            if(categories == undefined){
                debugLog('Category defaultCategory: do not have default categories for this session');
                var dow = (new Date()).getDay();
                var currentUser = accountAccessor.getCurrentUser();
                var accountId = accountAccessor.getAccountId();
                if(currentUser == null || accountId == ''){
                    debugLog('Category defaultCategory: do not have users so dont do anything');
                    return;
                }else{
                    debugLog('Category defaultCategory: calling category service to get defaults');
                    $.ajax({
                        url: "/category/default?accountId="+accountId+"&userId="+currentUser._id+"&dow="+dow
                    }).done(function(data) {
                        categories = data;
                        window.setJsonToSession('category', data);
                    });
                }
            }

            if(categories != null && categories.length >= offset) {
                defaultCategory = categories[offset];
            }

            if(defaultCategory != '') {
                debugLog('Category defaultCategory: setting default to:' + defaultCategory);
                pageAccessor.defaultCategory(defaultCategory);
            }else{
                debugLog('Category defaultCategory: no default category available at this time');
            }

        }
    };
})();