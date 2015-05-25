var mongoose = require( 'mongoose' );
var Accounts = mongoose.model( 'account' );
var Members = mongoose.model( 'member' );

exports.getAccount = function(req, res){
    var id = req.query.id;
    Accounts.findById(id, function (err, doc) {
        if(doc == null){
            console.log(err);
            res.render('account/login', { title: 'Accountable' });
        }else {
            var firstUser = doc.members.length > 0 ? doc.members[0] : null;
            var account = {
                id: id,
                members: doc.members,
                currentUser: firstUser
            }
            res.send(account);
        }
    });
}

exports.member_create = function(req, res){
    var id = req.query.id;
    var newUser = req.body.member;
    var member = new Members();
    member.name = newUser;
    member.created = new Date();

    Accounts.findByIdAndUpdate(
        id,
        {$push: {"members": member}},
        {safe: true, upsert: true},
        function(err, model) {
            if (err != undefined) {
                console.log(err);
                res.send('error saving new member');
            } else {
                res.send(member);
            }
        }
    );

}

exports.logout = function(req, res){
    res.send('data');
}
