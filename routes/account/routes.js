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
            res.cookie('logit', {ref: doc.id}, {maxAge: 365});
            if(doc.users.length > 0) {
                res.redirect('/transactions/logit');
            }else{
                res.redirect('account/manage');
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
    account.save(function(err){
        if (err){
            res.render('account/register');
        }else{
            res.cookie('logit', {ref: account.id}, {maxAge: 365});
            res.redirect('account/manage');
        }
    });
}

exports.manage = function(req, res){
    res.render('account/manage');
}
