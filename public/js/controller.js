
var loyaltyApp = angular.module('loyaltyApp',['ngRoute', 'ui.router','angularVideoBg', 'googlechart'])
loyaltyApp.config([ '$urlRouterProvider', '$stateProvider',
      function($urlRouterProvider, $stateProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider.state('shop', {
            url : '/shop',
            templateUrl : '/shop',
            params : {'shopname' : null}	
          })
          .state('all_stores',{
           url:'/all_stores',
           templateUrl:'partials/all_stores',
      })
      .state('recents',{
           url:'/recents',
           templateUrl:'partials/recents',
      })
      .state('admin',{
           url:'/admin',
           templateUrl:'/admin'              
      });
         
}]);

loyaltyApp.controller('mainController', function($scope,$http){
	console.log("loaded Main controller for shop");
	$scope.clickME = function(){
		console.log("clicked");
	}
	
	$http.get('/api/todaysLoyalty').success(function(data){
		$scope.today_loyal = 'Loyal :'+data.data.todaysLoyalty;
	});
	
	$http.get('/api/totalCustomers').success(function(data){
		$scope.today_customers = 'Customers :'+data.data.totalCustomers;
	});
	
	$http.get('/api/totalPurchasedAmount').success(function(data){
		$scope.today_amount = 'Purchase :'+data.data.totalPurchase;
	});
	
	$http.get('/api/totalLoyalPerStore').success(function(data){
		$scope.loyalPerStoreData = [];
		var color = ""
		//console.log(data.data);
		loyalStoreData = data.data;
		//[{'loyal' : 11, 'shops' : shop1}]
		for(var loyal in loyalStoreData){
			var row = loyalStoreData[loyal];
			if(row.shops == 'Shop1')
				color = 'red'
			else if(row.shops == 'Shop2')
				color = 'green'
			else if(row.shops == 'Shop3')
				color = 'yellow'
			else if(row.shops == 'Shop4')
				color = 'orange'
			else if(row.shops == 'Shop5')
				color = 'purple'
			y = { c : []};
			y.c.push({v : row.shops});
			y.c.push({v : row.loyal});
			y.c.push({v : color});
			$scope.loyalPerStoreData.push(y);
		}
		
		$scope.myChartObject.data.rows = [];
		$scope.myChartObject.data.rows = $scope.loyalPerStoreData;
	});	
	
//	$http.get('/api/LoyalvsNonLoyal').success(function(data){
//		$scope.loyalOverall = [];
//		loyalCount = data.data.loyalCount;
//		nonloyalCount = data.data.nonLoyalCount;
//		y = { c : []};
//		y.c.push({v : "Loyal Cust"});
//		y.c.push({v : loyalCount});
//		$scope.loyalOverall.push(y);
//		y = { c : []};
//		y.c.push({v : "Non Loyal Cust"});
//		y.c.push({v : nonloyalCount});
//		$scope.loyalOverall.push(y);
//		$scope.pieChartObject.data.rows = [];
//		$scope.pieChartObject.data.rows = $scope.loyalOverall;
//		console.log('DATA I GOT HERE');
//	});	
	$scope.y = { c : []};
	$scope.loyalOverall = [];
//	$http.get('/api/nonloyal').success(function(data){
//		
//		nonloyalCount = data.data
//		$scope.y.c.push({v : "Non Loyal Cust"});
//		$scope.y.c.push({v : nonloyalCount});
//		$scope.loyalOverall.push($scope.y);
//		
//	});	
//	$http.get('/api/loyal').success(function(data){
//		loyalCount = data.data
//		$scope.y = { c : []};
//		$scope.y.c.push({v : "Loyal Cust"});
//		$scope.y.c.push({v : loyalCount});
//		$scope.loyalOverall.push($scope.y);
//		$scope.y = { c : []};
//	
//	});
	
	$http.get('/api/recentTenTransactions').success(function(data){
		console.log(data);
		$scope.recentTenTransactions = [];
		var color = ""
		recentTenTransactions = data.data;
		
		for(var loyal in recentTenTransactions){
			var row = recentTenTransactions[loyal];
			if(row.shop_visited == 1)
				color = 'red'
			else if(row.shop_visited == 2)
				color = 'green'
			else if(row.shop_visited == 3)
				color = 'yellow'
			else if(row.shop_visited == 4)
				color = 'orange'
			else if(row.shop_visited == 5)
				color = 'purple'
			y = { c : []};
			y.c.push({v : row.customer_id});
			y.c.push({v : row.amount_purchased});
			y.c.push({v : color});
			$scope.recentTenTransactions.push(y);
		}
		
		$scope.recentTransactionsObject.data.rows = [];
		$scope.recentTransactionsObject.data.rows = $scope.recentTenTransactions;
	});	
	
	
$scope.myChartObject = {};
    
    $scope.myChartObject.type = "ColumnChart";
    
    $scope.onions = [
        {v: "Onions"},
        {v: 3},
    ];

//    $scope.myChartObject.data = {"cols": [
//        {id: "month", label: "Month", type: "string" },
//        {id: "laptop-id", label: "Laptop", type: "number" },
//        {role: "style", type: "string"}
//    ], "rows": [
//        {c: [
//            {v: "January"},
//            {v: 19, f: "42 items"},
//            {v: "silver"}
//        ]},
//        {c: [
//            {v: "February"},
//            {v: 13},
//            {v: "gold"}
//        ]},
//        {c: [
//            {v: "March"},
//            {v: 24},
//            {v: "red" }
//        ]}
//    ]};
    $scope.myChartObject.data = {"cols": [
        {id: "month", label: "Shops", type: "string" },
        {id: "laptop-id", label: "Loyal Customers", type: "number" },
        {role: "style", type: "string"}
    ], "rows": $scope.loyalPerStoreData
    };

    $scope.myChartObject.options = {
        'title': 'Loyal Customers by shop'
    };
    
    
    ////////////////////
 $scope.pieChartObject = {};
    
    $scope.pieChartObject.type = "PieChart";
    
    $scope.onions = [
        {v: "Onions"},
        {v: 3},
    ];

    $scope.pieChartObject.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
      {c: [
      {v: "Loyal"},
      {v: 817},
  ]},
  {c: [
      {v: "Non Loyal"},
      {v: 4191},
      
  ]}
]
    };

    $scope.pieChartObject.options = {
        'title': 'Loyal Vs Non Loyal Customers'
    };
    
    
    /////////////////////
$scope.recentTransactionsObject = {};
    
    $scope.recentTransactionsObject.type = "ColumnChart";
   

//    $scope.myChartObject.data = {"cols": [
//        {id: "month", label: "Month", type: "string" },
//        {id: "laptop-id", label: "Laptop", type: "number" },
//        {role: "style", type: "string"}
//    ], "rows": [
//        {c: [
//            {v: "January"},
//            {v: 19, f: "42 items"},
//            {v: "silver"}
//        ]},
//        {c: [
//            {v: "February"},
//            {v: 13},
//            {v: "gold"}
//        ]},
//        {c: [
//            {v: "March"},
//            {v: 24},
//            {v: "red" }
//        ]}
//    ]};
    $scope.recentTransactionsObject.data = {"cols": [
        {id: "phonenumber", label: "Customer Id", type: "string" },
        {id: "amount", label: "Amount Purchased", type: "number" },
        {role: "style", type: "string"}
    ], "rows": $scope.recentTenTransactions
    };

    $scope.groceryPage = function(){
    	
    	window.location.assign('/admin');
    }
    
	
});

loyaltyApp.controller('shopController', function($scope,$http,$stateParams){
	console.log("loaded Shop controller for shops");
console.log($stateParams.shopname);
	
	$scope.shopname=$stateParams.shopname;
	$scope.loyalByShop;
	$scope.nonLoyalByShop;
	$scope.myPieChartObject= {};
	$scope.myChartObject = {};
	$scope.rows=[];
	
$scope.frequentCustomers=[];
$scope.todayLoyalCustomers;
$scope.todayTotalCustomers;
$scope.todayAmountPurchased;
$scope.getCurrentTransaction;

	
	//$scope.shopname='2';
	
	var loyalByShopURL='/getLoyalByShop?shopname='+$scope.shopname;
	
	$http.get(loyalByShopURL).then(function(response){
		
		
		
		$scope.loyalByShop=response.data.data.loyal_count;
		
		var nonloyalByShopURL='/getNonLoyalByShop?shopname='+$scope.shopname;
		
		$http.get(nonloyalByShopURL).then(function(response){

			$scope.nonLoyalByShop=response.data.data.non_loyal_count;
			console.log('NOn Loyal');
			console.log($scope.nonLoyalByShop);
			console.log('Loyal');
			console.log($scope.loyalByShop);
			
			  $scope.myPieChartObject.type = "PieChart";
			    
			 

			    $scope.myPieChartObject.data = {"cols": [
			        {id: "t", label: "Topping", type: "string"},
			        {id: "s", label: "Slices", type: "number"}
			    ], "rows": [
			        {c: [
			            {v: "Loyal"},
			            {v:$scope.loyalByShop},
			        ]},
			      
			        {c: [
			            {v: "Non Loyal"},
			            {v: $scope.nonLoyalByShop}
			        ]}
			    ]};

			    $scope.myPieChartObject.options = {
			        'title': 'Loyal Customers vs Non Loyal Customers'
			    };
			    
			
		
		})
	
		
		
	});
	
	
	var recentTransactionsURL="/getRecentTransactions?shopname="+$scope.shopname;
	
	$http.get(recentTransactionsURL).then(function(response){
	
		//console.log(response.data.data);
		
		for(var trans in response.data.data)
			{
			//console.log(response.data.data[trans]);
			
			var transaction=response.data.data[trans];
			
			var tempCustomerIdObject={};
			var tempCustomerAmount={};
			var tempColor={};
			
			var x= {
					
					c:[]
					
			};
			tempCustomerIdObject.v=transaction.customer_id
			//tempArray.push[{"v":transaction.customer_id}];
			x.c.push(tempCustomerIdObject);
			//console.log(x);
			//console.log(tempObject);
			if(transaction.is_loyal=="1")
			{
			x.c.push[{v:transaction.amount_purchased,f:"Loyal"}];
			tempCustomerAmount.v=transaction.amount_purchased;
			tempCustomerAmount.f="loyal";
			//console.log(tempCustomerAmount);
			x.c.push(tempCustomerAmount);
			tempColor.v="green";
			x.c.push(tempColor);

			//x.c.push[{v:"green"}];
			
			}
		else
			{
			//x.c.push[{v:transaction.amount_purchased,f:"Non Loyal"}];
			//x.c.push[{v:"red"}];
		
			tempCustomerAmount.v=transaction.amount_purchased;
			tempCustomerAmount.f="Non Loyal";
			x.c.push(tempCustomerAmount);

			//console.log(tempCustomerAmount);
			tempColor.v="red";
			x.c.push(tempColor);

			}
			//console.log(x);
			$scope.rows.push(x);
			}
		//console.log($scope.rows);
		$scope.myChartObject.data.rows=$scope.rows;
	})
	
	
	
	


$scope.myChartObject = {};
	
	/*$scope.temp=[
	             {c: [
	                  {v: "January"},
	                  {v: 19, f: "42 items"},
	                  {v: "green"}
	              ]},
	              {c: [
	                  {v: "February"},
	                  {v: 13},
	                  {v: "gold"}
	              ]},
	              {c: [
	                  {v: "March"},
	                  {v: 24},
	                  {v: "red" }
	              ]}
	          ];*/
    
    $scope.myChartObject.type = "ColumnChart";
    
    $scope.onions = [
        {v: "Onions"},
        {v: 3},
    ];

    $scope.myChartObject.data = {"cols": [
        {id: "Customer", label: "Phone Number", type: "string" },
        {id: "Amount Purchased", label: "Amount", type: "number" },
        {role: "style", type: "string"}
    ], "rows": $scope.temp};

    $scope.myChartObject.options = {
        'title': ' Recent 10 Transactions at store '
    };
    
    
  var frequentCustomersURL='/getFrequentCustomers?shopname='+$scope.shopname; 
  
  $http.get(frequentCustomersURL).then(function(response){
	  
	  $scope.frequentCustomers=response.data.data;
	  console.log($scope.frequentCustomers);
	  
  });
 var todayLoyalCustomerURL='/getLoyalCustomersByShopToday?shopname='+$scope.shopname;
    
 
 $http.get(todayLoyalCustomerURL).then(function(response){
	
	 $scope.todayLoyalCustomers=response.data.data.total_loyal_today;
	// console.log('Below is today loyal customers count');
	 //console.log($scope.todayLoyalCustomers);
	 
 });
 
var todayTotalCustomersURL='/getTotalCustomersByShopToday?shopname='+$scope.shopname;

$http.get(todayTotalCustomersURL).then(function(response){
	
	$scope.todayTotalCustomers=response.data.data.total_customers_today;
	
});
    
var todayAmountPurchasedURL='/getTotalAmountByShopToday?shopname='+$scope.shopname;


$http.get(todayAmountPurchasedURL).then(function(response){
	
	$scope.todayAmountPurchased=response.data.data.purchased_amount_today;
	
});
	
var getCurrentTransactionByShopURL='/getCurrentTransactionByShop?shopname='+$scope.shopname;
$http.get(getCurrentTransactionByShopURL).then(function(response){
	$scope.getCurrentTransaction=response.data.data;

	
});

});



