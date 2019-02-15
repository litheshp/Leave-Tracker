requestApp.controller('requestController', ['$scope', '$resource','$http', function ($scope, $resource,$http) {
  var req = $resource('/api/requests');
  
  req.query(function (results) {
	    $scope.requestList = results;
	    $scope.user = sessionStorage.getItem("user")
	  });
  var configdoc = $resource('/api/config');
	configdoc.query(function (results) {
		    $scope.config = results;
		  });
  $scope.getData = function(unid){
	  $http.post('/api/data' ,{id:unid}) // PASS THE DATA AS THE SECOND PARAMETER
    .success(
        function(success){
			 $scope.data = success;
			 console.log(success);
        })
    .error(
        function(error){
            console.log(error);
        });
   } 
  $scope.createRequest = function () {
	  console.log("Bfr const");
	    var req = new Request();
	    console.log("Aftr const")
	    req.FirstName = $scope.FirstName;
	    req.SecondName = $scope.SecondName;
	    console.log($scope.FirstName)
	    req.$save(function (result) {
	      $scope.requestList.push(result);
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
 }])

