importApp.controller('dataController', ['Flash',
		'$scope',
		'$resource',
		'$http',
		function(Flash,$scope, $resource, $http) {
			var datArray = [];
			var qArray = [];
			/*var data = $resource('/api/listweeklydata');
			data.query(function(results) {
				$scope.dataList = results;
				//$scope.empList = getQuarterData(results);
			});
*/
			var message = '<strong> Well done!</strong>  You successfully read this important alert message.';
		    var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
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
			$scope.weeklyimportToJSON = function() {
				alert('Inside import')
				$http.post('/upload/uploaddata') // PASS THE DATA AS THE SECOND PARAMETER
				.success(function(results) {
					
					 document.getElementById("notifications").innerHTML = "Successfully imported all the records!";
					 
					$scope.JSONData = results;
				}).error(function(error) {
					console.log(error);
				});
			}
			$scope.deleteAll = function(){
				 if (confirm("Do you want to delete all the records?")) {
					 
				        $http.post('/calculate/delete')
					  	.success(function(results){
					  		document.getElementById("notifications").innerHTML = "Successfully deleted all the records!";
					  		console.log(results);
					  		
					  	})
				    } else {
				       alert("Canceled!");
				    }
				
			 }
			$scope.importAll = function(){
				 if (confirm("Do you want to upload all the records?")) {
					 
				        $http.post('/pages/upload1')
					  	.success(function(results){
					  		console.log(results);
					  		document.getElementById("notifications").innerHTML = "Successfully imported all the records!";
					  	})
				    } else {
				       alert("Canceled!");
				    }
				
			 }
			
				
			
		} ]);
