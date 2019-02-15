authApp.controller('authController', ['$scope', '$resource','$http', function ($scope, $resource,$http) {
  
	 $scope.signin = function(){
		 $http.post('/signin') // PASS THE DATA AS THE SECOND PARAMETER
	    .success(
	        function(results){
	        	$scope.message = results;
	        		        })
	    .error(
	        function(error){
	            console.log(error);
	        });
	   }
	 $scope.signout = function(){
		 $http.post('/signout') // PASS THE DATA AS THE SECOND PARAMETER
	    .success(
	        function(results){
	        	$scope.message = results;
	        		        })
	    .error(
	        function(error){
	            console.log(error);
	        });
	   }
  
}]);