var loyaltyApp = angular.module('loyaltyApp',['ngRoute', 'ui.router','angularVideoBg', 'googlechart'])
loyaltyApp.config([ '$urlRouterProvider', '$stateProvider',
      function($urlRouterProvider, $stateProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider.state('shop', {
            url : '/shop',
            templateUrl : '/shop',
            params : {'shopId' : null}	
          })
          .state('all_stores',{
           url:'/all_stores',
           templateUrl:'partials/all_stores',
      })
      .state('recents',{
           url:'/recents',
           templateUrl:'partials/recents',
      })
         
}]);
loyaltyApp.controller('mainController', function($scope,$http){
	console.log("loaded");
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

    
	
});