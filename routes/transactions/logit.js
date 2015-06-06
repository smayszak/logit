var mongoose = require( 'mongoose' );
var Transaction = mongoose.model( 'transaction' );


exports.data_entry = function(req, res){
    res.render('transactions/logit', { title: 'Logit' });
};

exports.data_edit = function(req, res){
    var id = req.query.id;
    if(id ==null)
        res.render('transactions/logit', { title: 'Logit' });
    else {
        Transaction.findById(id, function (err, trans) {
            if(err != undefined){
                console.log(err);
                return res.redirect('/transactions/logit');
            }else {
                return res.render('transactions/logedit', {title: 'Logedit', record: trans});
            }
        });


    }
};
