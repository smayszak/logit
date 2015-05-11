var mongoose = require( 'mongoose' );
var Accounts = mongoose.model( 'account' );

exports.members = function(req, res){
    var family = ['Steve', 'Elissa', 'West'];
    res.send(family);
}

exports.getAccount = function(req, res){
    var id = req.query.id;
    Accounts.findById(id, function (err, doc) {
        if(doc == null){
            console.log(err);
            res.render('account/login', { title: 'Accountable' });
        }else {
            var firstUser = doc.users.length > 0 ? doc.users[0] : null;
            var account = {
                id: id,
                users: doc.users,
                currentUser: firstUser
            }
            return account;
        }
    });
}

exports.member_create = function(req, res){
    console.log(req.body);
    res.send('ok');
}

exports.logout = function(req, res){
    res.send('data');
}
