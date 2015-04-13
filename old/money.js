var http;
var cat  = undefined;
exports.init = function(_http, _cat){
	http = _http;
    cat = _cat;
	return exports;
};

exports.money = function(req, res){
    var cookie = getCookie(req, res);
    var defaultSelection = getCategory(res, cookie);
    var categories = cat.categoryList(cookie.name);
    res.render('logit', { title: 'Log it!', catlist:categories, defaultSelection: defaultSelection});
}

exports.moneypost = function(req, res){
    var cookie = getCookie(req,res);
    var defaultSelection = getCategory(res, cookie);
    var categories = cat.categoryList(cookie.name);

    var money = req.body;
    var moneyTime = money.dt;
    var moneyTz = money.tz;
    var now = new Date(moneyTime);
    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    now_utc.setUTCHours(now_utc.getUTCHours() + (moneyTz/60));
    var utc_hour = now_utc.getHours();
  if(money === undefined || money.cost == ''){
  	res.render('logit', { title: 'Log it!', catlist:categories,
  		defaultSelection: defaultSelection});
  }else{
	  return global.db.Transaction.create({
	    category: money.category,
	    owner: cookie.name,
	    cost: money.cost,
	    date: now_utc,
        payment:  money.payment,
	    comments: money.comments
	  }).then(function() {
	    cat.updateIndex(cookie, money.category, utc_hour);
	    res.render('logit', { title: 'Log it!', catlist:categories,
	    	defaultSelection: defaultSelection});
	  });
  }
}

function getCategory(res, cookie){
    var utcHours = (new Date()).getUTCHours();
    var defaultSelection;
    try {
        defaultSelection = cat.defaultSelection(cookie, utcHours);
    }catch (err) {
        if(err.message == 'new user'){
            res.redirect('/categories');
        }else {
            console.log("Error:", err);
        }
    }
    return defaultSelection;
}

function getCookie(req, res){
    var cookie = req.cookies['mayheim-money'];
    if(cookie === undefined){
        res.redirect('/');
    }
    return cookie;
}