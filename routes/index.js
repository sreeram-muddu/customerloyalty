
/*
 * GET home page.
 */
var mysql = require('./mysqlProvider');
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  connection = mysql.mysqlConnectionStringProvider.getMySqlConnection();
};