
exports.data_entry = function(req, res){
    res.render('logit', { title: 'Accountable' });
};

exports.data_write= function(req, res){
    console.log(req.body);
    res.send({ id: 'newid'});
}