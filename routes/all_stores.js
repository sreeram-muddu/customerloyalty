var mysql = require('./mysqlProvider');
exports.totalLoyalPerStore = function(req, res) 
{
	var sql="select CASE WHEN shop_visited = 1 THEN \'Shop1\' WHEN shop_visited = 2 THEN \'Shop2\'  WHEN shop_visited = 3 THEN \'Shop3\' END as shops, count(*) from pos_transaction pos, loyal_table lt where pos.customer_id in (select distinct customer_id from pos_transaction) and pos.customer_id = lt.customer_id and lt.is_loyal =1 group by shop_visited";
	connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();
	connection.query(sql, function(err,rows,fields){

		if(!err){
	  		//callback({status : 200, data : rows[0]});
	  		res.send({status : 200, data : rows[0]});
		}
	  	else
	  		{
	  		callback({status : 400});
	  		throw err;
	  		}
		
	})
	mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	
}

exports.LoyalvsNonLoyal = function(req, res) 
{
	var sql="select count(*) as loyalCount from pos_transaction pos, loyal_table lt where pos.customer_id in (select distinct customer_id from pos_transaction) and pos.customer_id = lt.customer_id and lt.is_loyal =1 group by shop_visited";
	connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();
	connection.query(sql, function(err,rows,fields){
		if(rows.length == 0)
			loyalCount = 0;
		else
			loyalCount = rows[0];
		if(!err){
	  		//callback({status : 200, data : rows[0]});
			sql = "select count(*) as NonloyalCount from pos_transaction pos, loyal_table lt where pos.customer_id in (select distinct customer_id from pos_transaction) and pos.customer_id = lt.customer_id and lt.is_loyal =2 group by shop_visited";
			connection.query(sql, function(err,rows,fields){
				if(rows.length == 0)
					nonLoyalCount = 0
				else
					nonLoyalCount = rows[0].nonloyalCount;
						
				if(!err){
					res.send({status : 200, data : {'loyalCount' : loyalCount.loyalCount, 'nonLoyalCount' : nonLoyalCount}});
				}
			//mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);
			});	
		}
	  	else
	  		{
	  		callback({status : 400});
	  		throw err;
	  		}
	});
}

exports.recentTenTransactions = function(req, res) 
{
	var sql="select * from ( select * from pos_transaction  where purchase_date <= '2016-12-06 00:00:00' order by purchase_date desc ) as x limit 10	"
	connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();
	connection.query(sql, function(err,rows,fields){
		if(!err){
	  		res.send({status : 200, data : rows[0]});
		}
	  	else
	  		{
	  		callback({status : 400});
	  		throw err;
	  		}
		
	})
	mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);
}

exports.todaysLoyalty = function(req, res) 
{
	var sql="select count(*) as todaysLoyalty from pos_transaction pos, loyal_table lt where pos.purchase_date like '%2016-12-05%' and pos.customer_id in (select distinct customer_id from pos_transaction) and pos.customer_id = lt.customer_id and lt.is_loyal =1"
	connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();
	connection.query(sql, function(err,rows,fields){
		if(!err){
	  		res.send({status : 200, data : rows[0]});
		}
	  	else
	  		{
	  		callback({status : 400});
	  		throw err;
	  		}
		
	})
	mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);
}

exports.totalCustomers = function(req, res) 
{
	var sql="select count(*) as totalCustomers from pos_transaction pos, loyal_table lt where pos.purchase_date like '%2016-12-05%' and pos.customer_id in (select distinct customer_id from pos_transaction) and pos.customer_id =lt.customer_id"
	connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();
	connection.query(sql, function(err,rows,fields){
		if(!err){
	  		res.send({status : 200, data : rows[0]});
		}
	  	else
	  		{
	  		callback({status : 400});
	  		throw err;
	  		}
		
	})
	mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);
}

exports.totalPurchasedAmount = function(req, res) 
{
	var sql="select sum(amount_purchased) as totalPurchase from pos_transaction where purchase_date like '%2016-12-03%'"
	connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();
	connection.query(sql, function(err,rows,fields){
		if(!err){
	  		res.send({status : 200, data : rows[0]});
		}
	  	else
	  		{
	  		callback({status : 400});
	  		throw err;
	  		}
		
	})
	mysql.mysqlConnectionStringProvider.closeMySqlConnection(connection);
}



