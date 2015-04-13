exports.category_list = function(req, res){
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

exports.categories = function(req, res){
    res.render("categories");
}

exports.default_category = function(req, res){
    res.send('Beer');
}