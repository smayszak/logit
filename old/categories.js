var models  = require('../models');
var cat_svc  = undefined;
exports.init = function(_cat){
    cat_svc = _cat;
    return exports;
};

exports.index_ = function(req, res){
  res.render('categories', { title: 'Add new category', user:loggedin(req,res) });
};

exports.post = function(req, res){
  var cat = req.body;
  console.log(cat);
  if(cat === undefined || cat.title == ''){
  	res.render('categories', { title: 'Add new category', user:loggedin(req,res)});
  }else{
	  return models.Categories.create({
	    user: cat.owner.toLowerCase(),
	    display: cat.title,
      index: '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'
	  }).then(function(sdepold) {
      cat_svc.invalidateCache();
	    console.log(sdepold.values);
	    res.render('categories', { title: 'Add new category', user:loggedin(req,res)});
	  });
  }
}

function loggedin(req, res){
    var cookie = req.cookies['mayheim-money'];
    if(cookie === undefined){
        res.redirect('/');
    }
    return cookie.name;
}