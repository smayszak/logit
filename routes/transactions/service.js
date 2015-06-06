/**
 * Created by mayszaks on 5/1/15.
 */
var mongoose = require( 'mongoose' );
var Transaction = mongoose.model( 'transaction' );
exports.delete = function(req, res){
    var id = req.body.id;
    Transaction.findByIdAndRemove(id, {},
    function(err, obj) {
        if (err) {
            next(err);
            req.session.destroy(function (error) {
                if (err) {
                    res.send('error');
                }
            });
        }else{
            res.json(200, 'ok');
        }
    });
}
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

exports.edit = function(req, res){
    var query = {"_id": req.body.id};
    var transaction = new Transaction();

    var date = globalizeDate(req.body.dt, req.body.tz);
    transaction._id = req.body.id;
    transaction.categoryId = req.body.categoryId;
    transaction.category =req.body.category;
    transaction.member = req.body.user;
    transaction.cost =  req.body.cost;
    transaction.date =  date;
    transaction.comments =  req.body.comments;
    transaction.payment =  req.body.payment;

    var options = {new: true};
    Transaction.findOneAndUpdate(query, transaction, options, function(err, record) {
        if (err) {
            console.log('got an error');
            res.send('error');
        }else{
            console.log('good update');
            res.send('ok');
        }
    });
}

globalizeDate = function(date, timeZone){
    var d = new Date(date);
    d = d.setHours(d.getHours() + (timeZone / 60));
    return d;
}