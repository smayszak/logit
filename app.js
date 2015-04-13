
/**
 * Module dependencies.
 */

var express = require('express');
var cookieParser = require('cookie-parser')
var http = require('http');
var path = require('path');

var account = require('./routes/account');
var category = require('./routes/category');
var index = require('./routes/index');
var logit = require('./routes/logit');
var reports = require('./routes/reports');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);
app.get('/logit', logit.data_entry);
app.post('/logit', logit.data_write);
app.get('/category/list', category.category_list);
app.get('/category/manage', category.categories);
app.get('/category/default', category.default_category);
app.get('/account/manage', account.manage);
app.get('/account/register', account.register);
app.post('/account/register', account.create);
app.post('/account/login', account.login);
app.post('/account/logout', account.logout);
app.get('/account/members', account.members);
app.post('/account/members', account.newmember);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'))
});
