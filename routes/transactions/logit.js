
exports.data_entry = function(req, res){
    res.render('transactions/logit', { title: 'Logit' });
};

exports.data_edit = function(req, res){
    var id = req.body.id;
    if(id ==null)
        res.render('transactions/logit', { title: 'Logit' });
    else
        res.render('transactions/logedit', { title: 'Logit', recId:id });
};
