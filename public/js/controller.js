var loyaltyApp = angular.module('loyaltyApp',['ngRoute', 'ui.router','googlechart'])
loyaltyApp.config([ '$urlRouterProvider', '$stateProvider',
      function($urlRouterProvider, $stateProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider.state('shop1', {
            url : '/shop1',
            templateUrl : 'partials/shop1'
          })
          .state('admin',{
           url:'/admin',
           templateUrl:'/admin',
           controller:'admin.controller.js'
              
      }).state('shop',{
          url:'/shop',
          templateUrl:'/shop',
          params: {
              shopname: null
          }
             
     });
         
}]);

loyaltyApp.controller('mainController', function($scope,$http){
	console.log("loaded Main controller for shop");
	$scope.clickME = function(){
		console.log("clicked");
	}
	
	
});





