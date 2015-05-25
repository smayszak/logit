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
                    account = accountAccessor.getAccount(account.id, account.currentUser, callback);
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
        getAccount: function(id, currentUser, callback){
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
                        currentUser: currentUser == null ? data.currentUser : currentUser,
                        expireHour: (new Date()).setHours(new Date().getHours() + 24),
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
                account.currentUser = newUser;
                window.location = window.location;
            }
            debugLog('Account updateUserList: save new members to local copy');
            setJsonToLocal('account', account);
        },
        currentUser: function(){
            debugLog('Account currentUser: retrieving current user');
            var account = getJsonFromLocal('account');
            if(account == null){
                debugLog('Account currentUser: account is null, go register or sign in or something');
                window.location = '/account/register';
            }
            if (account.currentUser == null){
                debugLog('Account currentUser: current user is null so get set it on the page');
                if(!window.location.href.endsWith('/account/manage')){
                    debugLog(window.location);
                    debugLog('Account currentUser: we are not on manage page - so not much we can do, go there');
                    window.location = '/account/manage';
                }
            }
            debugLog('Account currentUser: have a current user so use it');
            return account.currentUser;
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
            account.currentUser = theMember;
            setJsonToLocal('account', account);
            if(optionalRefresh == true || optionalRefresh == undefined) {
                debugLog('Account updateUser: requested page refresh so refreshing');
                window.location = window.location;
            }
        },
        getAccountId: function()
        {
            var account = getJsonFromLocal('account');
            if(account == undefined)
                return '';
            return account.id;
        }
    };
})();