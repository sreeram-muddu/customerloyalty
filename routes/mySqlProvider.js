var mysql = require('mysql');

mysqlConnectionStringProvider = {
    
    getMySqlConnection : function () { 
    	
        var connection = mysql.createConnection({
            host: 'loyalty.c2kjbn1r2egg.us-west-2.rds.amazonaws.com',
            user: 'cmpe239',
            password : 'password',
            database : 'loyaltyDB',
            multipleStatements : true
        });

        connection.connect(function (err) {
        
            if (err) { throw err; }

            console.log('Connected Successfully');
        });
        return connection;
    },

    closeMySqlConnection : function (currentConnection) {
    
        if (currentConnection) {
        
            currentConnection.end(function (err) { 
            
                if (err) { throw err; }

                console.log('connection closed successfully.')
            })
        }
    
    }


}

module.exports.mysqlConnectionStringProvider = mysqlConnectionStringProvider;