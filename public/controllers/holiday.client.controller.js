holidayApp.controller('holidayController', ['$scope', '$resource','$http', function ($scope, $resource,$http) {
  var holiday = $resource('/api/holidays');
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
  holiday.query(function (results) {
	    $scope.holidayList = results;
	  });
}]);