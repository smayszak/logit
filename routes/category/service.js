/**
 * Created by mayszaks on 5/1/15.
 */
exports.list = function(req, res){
    var l = [];
    if(req.query.user == "West") {
        l.push('Bar');
        l.push('Beer');
    }else if (req.query.user == "Elissa") {
        l.push('Book');
        l.push('Coffee');
        l.push('Clothes');
    }else {
        l.push('Electronics');
        l.push('Gift');
        l.push('Dinner');
    }
    res.send({categories:l});
};

exports.delete = function(req, res){
    console.log(req.body);
    res.send("ok");
};

exports.create = function(req, res){
    console.log(req.body);
    res.send("ok");
};

exports.default = function(req, res){
    res.send('Beer');
}