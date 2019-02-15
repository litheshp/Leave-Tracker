configApp.controller('configController', ['$scope', '$resource','$http', function ($scope, $resource,$http) {
	var configdoc = $resource('/api/config');
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
	configdoc.query(function (results) {
		    $scope.config = results;
		  });
}]);


