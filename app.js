
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , sql = require('./routes/sql')
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


/* written by smuddu */
app.get('/getRecentTransactions', function(req,res){
	
	//console.log(req.param("shopname"));

	
	sql.getTest(req.param("shopname"), function(data){
		    		
		   		 res.send(data);
		   		 
		   	 });
	
});

app.get('/getCurrentTransaction', function(req,res){
	
	sql.getCurrentTransaction(req.param("shopname"),function(data){
		res.send(data);
	})
	
});

app.get('/getFrequentCustomers',function(req,res){
	
	sql.getFrequentCustomers(req.param("shopname"),function(data){
		res.send(data);
	})
	
});

app.get('/getLoyalByShop',function(req,res){
	
	sql.getLoyalByShop(req.param("shopname"),function(data){
		res.send(data);
	})
	
});

app.get('/getNonLoyalByShop',function(req,res){
	
	sql.getNonLoyalByShop(req.param("shopname"),function(data){
		res.send(data);
	})
	
});

app.get('/getLoyalCustomersByShopToday',function(req,res){
	
	sql.getLoyalCustomersByShopToday(req.param("shopname"),function(data){
		res.send(data);
	})
	
});


app.get('/getTotalCustomersByShopToday',function(req,res){
	
	sql.getTotalCustomersByShopToday(req.param("shopname"),function(data){
		res.send(data);
	})
	
});

app.get('/getTotalAmountByShopToday',function(req,res){
	
	sql.getTotalAmountByShopToday(req.param("shopname"),function(data){
		res.send(data);
	})
	
});

app.get('/getCurrentTransactionByShop',function(req,res){
	
	sql.getCurrentTransactionByShop(req.param("shopname"),function(data){
		res.send(data);
	})
	
});

app.get('/')


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
