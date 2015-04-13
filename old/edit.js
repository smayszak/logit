/**
 * Created by steve on 2/24/15.
 */

exports.edit = function(req, res){
    var cookie= getCookie(req, res);
    var category = req.query.c;
    var hourOffset = getHourOffSet(req.query.t);
    //'2015-02-01 08:00:00-08'
    var endDate = req.query.e + ' ' + hourOffset + ":00:00-" + hourOffset;
    var startDate = req.query.s+ ' ' + hourOffset + ":00:00-" + hourOffset;

    var q ='SELECT * FROM "Transactions" '
        +  "where owner = '"+ cookie.name+"' "
        +  "AND category = '"+ category+"' "
        +  'AND "date" < '
        +   "'"+endDate+"'"
        +  'AND "date" > '
        +  "'"+startDate+"'";
    global.db.sequelize.query(q).then(function(query_results) {
        var resp =  [];

        for(var idx = 0; idx < query_results[0].length; idx++) {
            var trans = query_results[0][idx];
            resp.push(trans);
        }
        res.render('edit', { data: resp, cat: category});
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

