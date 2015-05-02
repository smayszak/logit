exports.login = function(req, res){
    res.render('account/login', { title: 'Accountable' });
};

exports.login_post = function(req, res){
    var un = req.body.username.toLowerCase();
    var pwd = req.body.password;

    ///TODO: mongoose validator here.....
    //do I recognize this computer?
    //take them to management page to select a user if not
    res.cookie('mayheim-money',  { name: un});
    res.redirect('/account/manage');
};

exports.register = function(req, res){
    res.render('account/register');
}
exports.manage = function(req, res){
    res.render('account/manage');
}

exports.create = function(req, res){
    var username = req.body.username.toLowerCase();
    var password = req.body.password;
    console.log(username);
    console.log(password);
    //TODO: mongoose here. neeed to get value back and write cookie.
    res.cookie('mayheim-money',  { name: username});
    res.redirect('account/manage');
}