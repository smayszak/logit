
/**
 * Module dependencies.
 */

var express = require('express');
var cookieParser = require('cookie-parser')
var http = require('http');
var path = require('path');

var account_routes = require('./routes/account/routes');
var account_service = require('./routes/account/service');

var category_routes = require('./routes/category/routes');
var category_service = require('./routes/category/service');

var logit_service = require('./routes/transactions/service');
var logit_routes = require('./routes/transactions/logit');
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

app.get('/', account_routes.login);
app.post('/account/login', account_routes.login_post);
app.get('/account/manage', account_routes.manage);
app.get('/account/register', account_routes.register);
app.post('/account/register', account_routes.create);

app.post('/account/logout', account_service.logout);
app.get('/account/members', account_service.members);
app.post('/account/member/create', account_service.member_create);

app.get('/category/manage', category_routes.manage);
app.get('/category/list', category_service.list);
app.get('/category/default', category_service.default);
app.get('/category/delete', category_service.default);
app.post('/category/create', category_service.create);

app.get('/transactions/logit', logit_routes.data_entry);
app.post('/transactions/create', logit_service.create);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'))
});
