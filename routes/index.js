
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Accountable' });
};

exports.who = function(req, res){
  var un = req.body.username.toLowerCase();
  var pwd = req.body.password;
  if(p == 'elissa' || p == 'steve'){
  	res.cookie('mayheim-money',  { name: p});
  	res.redirect('/logit');
  } 
  res.render('index', { title: '$$Accountable$$' });
};