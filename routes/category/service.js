/**
 * Created by mayszaks on 5/1/15.
 */
var mongoose = require( 'mongoose' );
var Accounts = mongoose.model( 'account' );
var Members = mongoose.model( 'member' );
var Category = mongoose.model('category');

exports.delete = function(req, res){
    console.log(req.body);
    res.send("ok");
};

exports.create = function(req, res){
    console.log(req.body);
    var id = req.body.accountId;
    var owner = req.body.owner;
    var category = new Category();
    category.name = req.body.category;
    Accounts.findById(id, function (err, account) {
        if(err != undefined){
            console.log(err);
            res.send(err);
        }
        for(var idx = 0; idx < account.members.length; idx++){
            if(account.members[idx].name == owner){
                account.members[idx].categories.push(category);
            }
        }
        account.save();
        res.send(category);
    });

};

exports.default = function(req, res){
    res.send('Beer');
}