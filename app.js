
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , all_stores = require('./routes/all_stores');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/partials/:name', routes.partials);
app.get('/api/totalLoyalPerStore', all_stores.totalLoyalPerStore);
app.get('/api/LoyalvsNonLoyal', all_stores.LoyalvsNonLoyal);
app.get('/api/recentTenTransactions', all_stores.recentTenTransactions);
app.get('/api/todaysLoyalty', all_stores.todaysLoyalty);
app.get('/api/totalCustomers', all_stores.todaysLoyalty);
app.get('/api/totalPurchasedAmount', all_stores.totalPurchasedAmount);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
