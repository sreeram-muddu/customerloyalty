
/*
 * GET home page.
 */
var mysql = require('./mysqlProvider');
exports.index = function(req, res){
  res.render('index', {});
  //connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();
};

exports.partials = function(req, res) 
{
	var name = req.params.name;
	res.render('partials/' + name);
}

exports.layout = function(req, res) 
{
	
	res.render('layout');
}