var mongoose = require( 'mongoose' );
var Accounts = mongoose.model( 'account' );


exports.login = function(req, res){
    res.render('account/login', { title: 'Accountable' });
};

exports.login_post = function(req, res){
    var un = req.body.username.toLowerCase();
    var pwd = req.body.password;
    Accounts.findOne({'login' : un, 'password': pwd}, function (err, doc) {
        if(doc == null){
            console.log(err);
            res.render('account/login', { title: 'Accountable' });
        }else {
            res.cookie('logit', doc.id, {maxAge: new Date(253402300000000)});
            if(doc.members.length > 0) {
                return res.redirect('/transactions/logit');
            }else{
                return res.render('account/manage');
            }
            console.log(doc);
        }
    });
};

exports.register = function(req, res){
    res.render('account/register');
}
exports.create = function(req, res){
    var un = req.body.username;
    var pwd = req.body.password;
    var account = new Accounts();
    if(un != null && pwd != null) {
        account.login = un.toLowerCase();
        account.password = pwd;
    }else{
        res.render('account/register');
    }
    //check for existing account
    Accounts.findOne({'login' : un}, function (err, existing) {
        if(err != undefined){
            //return;
            res.render('account/register');
        }
        if(existing){
            //TODO: found it -  tell the user we need a new name.
            res.render('account/register');
        }else{
            account.save(function(err){
                if (err){
                    return res.render('account/register');
                }else{
                    res.cookie('logit', account.id, {maxAge: new Date(253402300000000)});
                    return res.redirect('account/manage');
                }
            });
        }
    });
}

exports.manage = function(req, res){
    res.render('account/manage');
}
