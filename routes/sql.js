var mysql = require('./mysqlProvider');

exports.getTest = function(shopname, callback) 
{
	
	console.log(shopname);
	var shopname= shopname;
	var connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();

	var sql= "select * from pos_transaction where shop_visited='"+shopname+"' order by purchase_date desc limit 10"
 //console.log(sql);
	 connection.query(sql, function (err, rows, fields) {
		 
		
		  //console.log(rows);
	    	if(!err)
	    		callback({status : 200, data : rows});
	    	else
	    		{
	    		callback({status : 400});
	    		throw err;
	    		}
	    });
	 mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);	
	
}

exports.getCurrentTransaction=function(shopname,callback)
{
var sql="select * from pos_transaction where shop_visited='"+shopname+"' order by purchase_date desc limit 1";	

var connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();

connection.query(sql, function (err, rows, fields) {
	 
  	if(!err)
  		callback({status : 200, data : rows[0]});
  	else
  		{
  		callback({status : 400});
  		throw err;
  		}
  });
mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);	

}


exports.getFrequentCustomers=function(shopname,callback)
{
var sql="select customer_id,count(*) as no_of_visits from pos_transaction where shop_visited ='"+shopname+"' group by customer_id order by no_of_visits desc limit 10";

var connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();

connection.query(sql, function(err,rows,fields){

	if(!err)
  		callback({status : 200, data : rows});
  	else
  		{
  		callback({status : 400});
  		throw err;
  		}
	
})
mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);	

	
};

exports.getLoyalByShop=function(shopname,callback)
{
var sql="select count(distinct(customer_id)) as loyal_count from pos_transaction where shop_visited='"+shopname+"' and is_loyal='1'";

var connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();

connection.query(sql, function(err,rows,fields){

	if(!err)
  		callback({status : 200, data : rows[0]});
  	else
  		{
  		callback({status : 400});
  		throw err;
  		}
	
})
mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);	

	
};



exports.getNonLoyalByShop=function(shopname,callback)
{
var sql="select count(distinct(customer_id)) as non_loyal_count from pos_transaction where shop_visited='"+shopname+"' and is_loyal='2'";

var connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();

connection.query(sql, function(err,rows,fields){

	if(!err)
  		callback({status : 200, data : rows[0]});
  	else
  		{
  		callback({status : 400});
  		throw err;
  		}
	
})
mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);	

	
};





exports.getLoyalCustomersByShopToday=function(shopname,callback)
{
var sql="select count(*) as total_loyal_today from pos_transaction where shop_visited='"+shopname+"' and is_loyal='1' and purchase_date like '%2016-12-05%' ";

var connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();

connection.query(sql, function(err,rows,fields){

	if(!err)
  		callback({status : 200, data : rows[0]});
  	else
  		{
  		callback({status : 400});
  		throw err;
  		}
	
})
mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);	

	
};


exports.getTotalCustomersByShopToday=function(shopname,callback)
{
	var sql="select count(*) as total_customers_today from pos_transaction where shop_visited='"+shopname+"' and purchase_date like '%2016-12-05%'";

	var connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();

	connection.query(sql, function(err,rows,fields){

		if(!err)
	  		callback({status : 200, data : rows[0]});
	  	else
	  		{
	  		callback({status : 400});
	  		throw err;
	  		}
		
	})
	mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);	

		
	};
	
	exports.getTotalAmountByShopToday=function(shopname,callback)
	{
		var sql="select sum(amount_purchased) as purchased_amount_today from pos_transaction where purchase_date like '%2016-12-05%' and shop_visited='"+shopname+"'";

		var connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();

		connection.query(sql, function(err,rows,fields){

			if(!err)
		  		callback({status : 200, data : rows[0]});
		  	else
		  		{
		  		callback({status : 400});
		  		throw err;
		  		}
			
		})
		mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);	

			
		};
		
		
exports.getCurrentTransactionByShop=function(shopname,callback){
		
		var sql="select * from pos_transaction where shop_visited='"+shopname+"' order by purchase_date desc limit 1";

		var connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();

		connection.query(sql, function(err,rows,fields){

			if(!err)
		  		callback({status : 200, data : rows[0]});
		  	else
		  		{
		  		callback({status : 400});
		  		throw err;
		  		}
			
		})
		mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);	

			
		
	};	
