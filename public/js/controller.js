var loyaltyApp = angular.module('loyaltyApp',['ngRoute', 'ui.router','angularVideoBg'])
loyaltyApp.config([ '$urlRouterProvider', '$stateProvider',
      function($urlRouterProvider, $stateProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider.state('shop1', {
            url : '/shop1',
            templateUrl : 'partials/shop1'
          })
          .state('ongoingride',{
           url:'/Ridenow',
           templateUrl:'partials/ongoingride',
           controller:'driverRideController',    
      });
         
}]);
loyaltyApp.controller('mainController', function($scope,$http){
	console.log("loaded");
	$scope.clickME = function(){
		console.log("clicked");
	}
});