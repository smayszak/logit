/**
 * Created by mayszaks on 5/1/15.
 */
var accountAccessor = (function(){
    return {
        load: function(callback){
            console.log('load');
            var account = localStorage.getItem('account');
            var auth = accountAccessor.parseAuthCookie();
            if(account == null || account == undefined){
                if(auth != undefined){
                    //have cookie but no account data, get it.
                    console.log('cookie no account');
                    account = accountAccessor.getAccount(auth, null, callback);
                }
            }else{
                if(account.expired() == true) {
                    console.log('account refresh');
                    account = accountAccessor.getAccount(account.id, account.currentUser, callback);
                }
            }
            if(account != null){
                callback();
            }
        },
        parseAuthCookie: function(){
            //TODO: figure out how to read a cookie!!!
            return '554b96eed77bc2ab21000003';
        },
        getAccount: function(id, currentUser, callback){
            var thisCallback = callback;
            $.ajax({
                url: "/account?id="+id
            }).done(function(data) {
                if (data.err != undefined) {
                    console.log('retrieved account');
                    var account = new {
                        id: data.id,
                        users: data.users,
                        currentUser: currentUser == null ? data.defaultUser : currentUser,
                        expireHour: (new Date()).setHours(a.getHours() + 24),
                        expired: function () {
                            return expireHour < (new Date().getHours());
                        }
                    }
                    accountAccessor.saveAccount(account);
                    thisCallback();
                }
            });
        },
        saveAccount: function(account){
            console.log('setting account');
            localStorage.setItem('account',account);
        },
        updateMembers: function(pageAccessor){
            var members = localStorage.getItem('members');
            if(members == undefined){
            $.ajax({
                url: "/account/members"
            }).done(function(data) {
                console.log(data);
                localStorage.setItem('members', data);
                pageAccessor.updateMembers(data);
            });}
            else{
                pageAccessor.updateMembers(members.split(','));
            }
        },
        updateUserList: function(newUser){
            var members = localStorage.getItem('members').split(',');
            members[members.length] = newUser;
            localStorage.setItem('members', members);
        },
        currentUser: function(){
            var account = localStorage.getItem('account');
            if(account == null){
                window.location = '/account/register';
            }
            if (account.currentUser() == null){
                window.location = '/account/manage';
            }
            return account.currentUser();
        },
        updateUser: function(e, optionalRefresh){
            var target = $(e);
            var name = target.data("name");
            $('#active-user').empty();
            $('#active-user').append(name);
            var account = localStorage.getItem('account');
            account.currentUser = name;
            localStorage.setItem('account', account);
            if(optionalRefresh == true || optionalRefresh == undefined) {
                window.location = window.location;
            }
        }
    };
})();