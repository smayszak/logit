/**
 * Created by mayszaks on 5/1/15.
 */
var accountAccessor = (function(){
    return {
        load: function(callback){
            debugLog('Account load:');
            var account = getJsonFromLocal('account');
            var auth = accountAccessor.parseAuthCookie();
            if(account == null || account == undefined){
                debugLog('Account load: do not have account');
                if(auth != ''){
                    //have cookie but no account data, get it.
                    debugLog('Account common: have auth key');
                    account = accountAccessor.getAccount(auth, null, callback);
                }else{
                    debugLog("Account load: no account, let running page decide what to do");
                    callback(false);
                }
            }else{
                debugLog('Account load: have account will check if expired');
                if(account.expireHour < (new Date()).getTime()) {
                    debugLog('Account common: expired, will refresh account');
                    account = accountAccessor.getAccount(account.id, callback);
                }
            }
            if(account != null){
                debugLog('Account load: account ready, returning to process');
                callback(true);
                return;
            }
        },
        parseAuthCookie: function(){
            var id = $.cookie('logit');
            if(id === undefined) {
                debugLog('Account parseAuthCookie: can not find auth cookie');
                return '';
            }
            debugLog('Account parseAuthCookie: have auth cookie');
            return id;
        },
        getAccount: function(id, callback){
            debugLog('Account getAccount: geting account - async');
            $.ajax({
                url: "/account?id="+id
            }).done(function(data) {
                debugLog('Account getAccount: received account callback');
                if (data.err === undefined) {
                    debugLog(data);
                    var account = {
                        id: data.id,
                        members: data.members,
                        expireHour: (new Date()).setHours(new Date().getHours() + 24),
                        defaultCategory: data.defaultCategory
                    };
                    accountAccessor.saveAccount(account);
                    if(callback != undefined) {
                        callback(true);
                    }
                    return account;
                }
            });
        },
        saveAccount: function(account){
            debugLog('Account saveAccount: saving account');
            setJsonToLocal('account',account);
        },
        updateMembers: function(pageAccessor){
            debugLog('Account updateMembers: updating account members');
            var account = getJsonFromLocal('account');
            if(account == undefined){
                debugLog('Account updateMembers: account is null while trying to update members');
                window.location = '/';
            }
            if(account.members == undefined){
                debugLog('Account updateMembers: account has been retrieved with no members, nothing to do');
            }else{
                debugLog('Account updateMembers: return to caller to update members on page');
                pageAccessor.updateMembers(account.members);
            };
        },
        updateUserList: function(newUser){
            debugLog('Account updateUserList: updating user list');
            var account = getJsonFromLocal('account');

            debugLog('Account updateUserList: save to existing list');
            account.members.push(newUser);
            if(account.members.length == 1){
                accountAccessor.setCurrentUser(newUser);
                window.location = window.location;
            }

            debugLog('Account updateUserList: save new members to local copy');
            setJsonToLocal('account', account);
        },
        setCurrentUser: function(user){
            localStorage.setItem('active-member', user.name);
        },
        getCurrentUser: function(){
            debugLog('Account getCurrentUser: retrieving current user');
            var currentUser = localStorage.getItem('active-member');
            var account = getJsonFromLocal('account');debugLog('Account getCurrentUser: retrieving current user');
            if(account == null){
                debugLog('Account getCurrentUser: account is null, go register or sign in or something');
                window.location = '/account/register';
            }

            if (currentUser == null && account.members.length == 0){
                debugLog('Account getCurrentUser: sessions storage is empty and there are no users');
                if(window.location.href.indexOf('/account/manage') < 0){
                    debugLog(window.location);
                    debugLog('Account getCurrentUser: we are not on manage page - so not much we can do, go there');
                    window.location = '/account/manage';
                }
            }
            var current = null;
            if(currentUser == null && account.members.length>0){
                debugLog('Account getCurrentUser: session storage empty but we hae users, pick first');
                current = account.members[0];
                accountAccessor.setCurrentUser(current);
            }else {
                debugLog('Account getCurrentUser: restore from saved state');
                for(var idx = 0; idx < account.members.length; idx++){
                    if(account.members[idx].name == currentUser){
                        debugLog('Account getCurrentUser: found our user breaking out of loop');
                        current = account.members[idx];
                        break;
                    }
                }
            }

            return current;
        },
        updateUser: function(e, optionalRefresh){
            debugLog('Account updateUser: updating current user');
            var target = $(e);
            var name = target.data("name");
            $('#active-user').empty();
            $('#active-user').append(name);
            var account = getJsonFromLocal('account');
            var theMember;
            for(var idx = 0; idx < account.members.length; idx++){
                if(account.members[idx].name == name){
                    theMember = account.members[idx];
                    break;
                }
            }
            accountAccessor.setCurrentUser(theMember);
            if(optionalRefresh == true || optionalRefresh == undefined) {
                debugLog('Account updateUser: requested page refresh so refreshing');
                window.location = window.location;
            }
        },
        getAccountId: function()
        {
            debugLog('Account getAccountId: retrieving account id');
            var account = getJsonFromLocal('account');
            if(account == undefined) {
                debugLog('Account getAccountId: did not find an account id');
                return '';
            }
            debugLog('Account getAccountId: retrieving account id:' + account.id );
            return account.id;
        },
        getDisplayCategory: function(){
            debugLog('Account getDisplayCategory: retrieving default category');
            return "";
        },
        updateCategoryForMember: function(category, member){
            debugLog('Account updateCategoryForMember: looking for member:'+ member);
            var account = getJsonFromLocal('account');
            for(var idx = 0; idx < account.members.length; idx++){
                if(account.members[idx].name == member){
                    debugLog('Account updateCategoryForMember: found the member, updating');
                    account.members[idx].categories.push(category);
                    setJsonToLocal('account', account);
                    return;
                }
            }
            debugLog('Account updateCategoryForMember: didnt find it');
        }

    };
})();