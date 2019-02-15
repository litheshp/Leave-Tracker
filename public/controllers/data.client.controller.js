dataApp.controller('dataController', ['$scope', '$resource','$http', function ($scope, $resource,$http) {
  var data = $resource('/api/datalist');
  //var dt =  $resource('/api/areachart');
  data.query(function (results) {
	    $scope.dataList = results;
	    Morris.Donut({
	        element: 'morris-donut-chart',
	        data: results[0].nameArray,
	        resize: true
	    });
	  });
  
  $scope.filter = function(){
	 $http.post('/api/datalist', {quarter:$scope.quarter ,team:$scope.team}) // PASS THE DATA AS THE SECOND PARAMETER
    .success(
        function(results){
        	$scope.dataList = results;
        	$("#morris-donut-chart").empty();
        	 Morris.Donut({
     	        element: 'morris-donut-chart',
     	        data: results[0].nameArray,
     	        resize: true,
     	    });
        })
    .error(
        function(error){
            console.log(error);
        });
   }
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

