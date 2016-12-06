var loyaltyApp = angular.module('loyaltyApp',[])

loyaltyApp.controller('adminController', function($scope,$http){
	console.log("admin Controller");
	
	$scope.adminLogin=function()
	{
		
		console.log("It is supposed to do state change ");
	}
});