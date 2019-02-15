leaveApp.controller('leaveController', ['$scope', '$resource','$http', function ($scope, $resource,$http) {
  var requests = $resource('/api/requests');
  var l=0;
  var m = 0;
  requests.query(function (results) {
	    $scope.leaveRequests = results;
	    });
  var holiday = $resource('/api/holidays');
  holiday.query(function (results) {
	    $scope.holidayList = results;
	  });
  var data = $resource('/api/datalist');
  data.query(function (results) {
	    $scope.dataList = results;
	    Morris.Donut({
	        element: 'morris-donut-chart',
	        data: results[0].nameArray,
	        resize: true
	    });
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
  $scope.filter = function(){
	 $http.post('/api/datalist', {quarter:$scope.quarter ,team:$scope.team}) // PASS THE DATA AS THE SECOND PARAMETER
    .success(
        function(results){
        	$scope.dataList = results;
        })
    .error(
        function(error){
            console.log(error);
        });
   } 

}]);