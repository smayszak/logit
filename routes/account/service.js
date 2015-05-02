/**
 * Created by mayszaks on 5/1/15.
 */
exports.members = function(req, res){
    var family = ['Steve', 'Elissa', 'West'];
    res.send(family);
}

exports.member_create = function(req, res){
    console.log(req.body);
    res.send('ok');
}

exports.logout = function(req, res){
    res.send('data');
}
