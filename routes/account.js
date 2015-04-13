exports.manage = function(req, res){
    res.render('account/manage');
}

exports.register = function(req, res){
    res.render('account/register');
}
exports.members = function(req, res){
    var family = ['Steve', 'Elissa', 'West'];
    res.send(family);
}
exports.newmember = function(req, res){
    res.render('account/manage');
}
exports.create = function(req, res){
    var username = req.body.username.toLowerCase();
    var password = req.body.password;
    console.log(username);
    console.log(password);
    res.cookie('mayheim-money',  { name: username});
    res.redirect('account/manage');
}
exports.logout = function(req, res){
    res.send('data');
}

exports.login = function(req, res){
    res.send('data');
}