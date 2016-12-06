var loyaltyApp = angular.module('loyaltyApp');

loyaltyApp.controller('shopController', function($scope,$http,$stateParams){
	console.log("Shop Controller");
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

	
	$scope.shopname='2';
	
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

    //console.log($scope.myChartObject);
});