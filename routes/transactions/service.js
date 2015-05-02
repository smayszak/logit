/**
 * Created by mayszaks on 5/1/15.
 */

exports.create= function(req, res){
    console.log(req.body);
    res.send({ id: 'newid'});
}