billingApp.controller('billingCalController', ['$scope', '$resource','$http', function ($scope, $resource,$http) {
  var billingCalendar = $resource('/api/listBillingCalendar');
  
  billingCalendar.query(function (results) {
	    $scope.billingCalendarList = results;
	  });
  $scope.Authenticate = function() {
		$http.post('/authenticate').success(
				function(results) {
					console.log(results);
					$scope.User = results;
				}).error(function(results) {
			if (results.errorMessage != "") {
				window.location.href = "/signout";
			}
		});
	}
}]);