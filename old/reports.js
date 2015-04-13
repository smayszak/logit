exports.index = function(req, res){
    res.render('reports');
};

exports.runreport = function(req, res){
    var cookie= getCookie(req, res);
    var hourOffset = getHourOffSet(req.query.tz);
    //'2015-02-01 08:00:00-08'
    var endDate = req.query.ed + ' ' + hourOffset + ":00:00-" + hourOffset;
    var startDate = req.query.sd+ ' ' + hourOffset + ":00:00-" + hourOffset;

    var q ='SELECT payment, category, sum(cost) FROM "Transactions" '
        +  "where owner = '"+ cookie.name+"' "
        +  'AND "date" < '
        +   "'"+endDate+"'"
        +  'AND "date" > '
        +  "'"+startDate+"'"
        + 'group by "category", "payment"'
        + 'order by "category"';
    console.log(q);
    var cred = 0.0;
    var cash = 0.0;
    global.db.sequelize.query(q).then(function(query_results) {
        var resp =  {items:{}, cashTotal:0.0, credTotal:0.0, total:0.0};

        for(var idx = 0; idx < query_results[0].length; idx++) {
            var trans = query_results[0][idx];
            var hashed = resp.items[trans.category];
            if(hashed == undefined){
                hashed = {category:trans.category, cash:0.0, credit:0.0, total:0.0};
                resp.items[trans.category] = hashed;
            }
            var val = parseFloat(trans.sum);
            if (trans.payment == 'cash') {
                hashed.cash +=val;
                cash+=val;
            } else {
                hashed.credit +=val;
                cred +=val;
            };
            hashed.total +=val;
        }
        resp.cashTotal = cash;
        resp.credTotal = cred;
        resp.total = cred + cash;
        res.send(resp);
    });
};
function getCookie(req, res){
    var cookie = req.cookies['mayheim-money'];
    if(cookie === undefined){
        res.redirect('/');
    }
    return cookie;
}

function getHourOffSet(hour){
    if(hour > 9){
        return hour;
    }
    else{
        return "0" +hour;
    }
}

