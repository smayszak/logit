/**
 * Created by mayszaks on 5/1/15.
 */
var mongoose = require( 'mongoose' );
var Transaction = mongoose.model( 'transaction' );

exports.create= function(req, res){
    console.log(req.body);
    var transaction = new Transaction();

    var date = globalizeDate(req.body.dt, req.body.tz);

    transaction.categoryId = req.body.categoryId;
    transaction.memberId = req.body.userId;
    transaction.accountId = req.body.accountId;
    transaction.category =req.body.category;
    transaction.member = req.body.user;
    transaction.cost =  req.body.cost;
    transaction.date =  date;
    transaction.comments =  req.body.comments;
    transaction.payment =  req.body.payment;

    transaction.save();
    res.send({ id: transaction._id});
}

globalizeDate = function(date, timeZone){
    var d = new Date(date);
    d = d.setHours(d.getHours() + (timeZone / 60));
    return d;
}