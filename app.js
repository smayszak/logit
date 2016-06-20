
/**
 * Module dependencies.
 */

var express = require('express'),
    db = require('./model/db'),
    cookieParser = require('cookie-parser'),
    http = require('http'),
    path = require('path'),
    account_routes = require('./routes/account/routes'),
    account_service = require('./routes/account/service'),
    category_routes = require('./routes/category/routes'),
    category_service = require('./routes/category/service'),
    logit_service = require('./routes/transactions/service'),
    logit_routes = require('./routes/transactions/logit'),
    report_routes = require('./routes/reports/routes'),
    report_service = require('./routes/reports/service');

var app = express();
var path = require('path');

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
app.get('/account', account_service.getAccount);
app.post('/account/login', account_routes.login_post);
app.get('/account/manage', account_routes.manage);
app.get('/account/register', account_routes.register);
app.post('/account/register', account_routes.create);

app.post('/account/logout', account_service.logout);
app.post('/account/member/create', account_service.member_create);

app.get('/category/manage', category_routes.manage);
app.get('/category/default', category_service.default);
app.get('/category/delete', category_service.delete);
app.post('/category/create', category_service.create);

app.get('/transactions/logit', logit_routes.data_entry);
app.get('/transactions/edit', logit_routes.data_edit);
app.patch('/transactions/edit', logit_service.edit);
app.delete('/transactions/edit', logit_service.delete);

app.post('/transactions/create', logit_service.create);
app.get('/index.html', function(req, res) {
    res.send(path.join(__dirname + '/index.html'));
});


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'))
});