requestApp.controller('excelController', [
		'$scope',
		'$resource',
		'$http',
		function($scope, $resource, $http) {
			var datArray = [];
			var qArray = [];
			var data = $resource('/api/list');
			data.query(function(results) {
				$scope.dataList = results;
				$scope.empList = getQuarterData(results);
			});
			
/*
			$scope.importToJSON1 = function() {
				alert('inside import')
				$http.post('/pages/upload1', {type:t}) // PASS THE DATA AS THE SECOND
				// PARAMETER
				.success(function(results) {

					$scope.JSONData = results;
				}).error(function(error) {
					console.log(error);
				});
			}*/
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
			

			function getDonutData(results,week) {
				var TeamList = [];
				TeamList = getUniqueTeam(results);
				for (i = 0; i < TeamList.length; i++) {
					var leave = 0;
					for (k = 0; k < results.length; k++) {
						if (TeamList[i] == results[k].Team) {
							leave = leave + parseInt(week[k]);
						}
					}

					datArray.push({
						"label" : TeamList[i],
						"value" : leave
					});
				}
				return datArray;
			}
			function getQuarterData(results) {
				var empId = getUniqueEmpID(results);

				HC1 = results.map(function(value) {
					return value.Week1;
				});
				HC2 = results.map(function(value) {
					return value.Week2;
				});
				HC3 = results.map(function(value) {
					return value.Week3;
				});
				HC4 = results.map(function(value) {
					return value.Week4;
				});
				HC5 = results.map(function(value) {
					return value.Week5;
				});
				HC6 = results.map(function(value) {
					return value.Week6;
				});
				HC7 = results.map(function(value) {
					return value.Week7;
				});
				HC8 = results.map(function(value) {
					return value.Week8;
				});
				HC9 = results.map(function(value) {
					return value.Week9;
				});
				HC10 = results.map(function(value) {
					return value.Week10;
				});
				HC11 = results.map(function(value) {
					return value.Week11;
				});
				HC12 = results.map(function(value) {
					return value.Week12;
				});
				HC13 = results.map(function(value) {
					return value.Week13;
				});
				var data = getDonutData(results,HC1);
				Morris.Donut({
					element : 'morris-donut-chart',
					data : data,
					resize : true
				});
				data = getDonutData(results,HC2);
				Morris.Donut({
					element : 'morris-donut-chart2',
					data : data,
					resize : true
				});
				// var HC = empId.length;
				for (k = 0; k < empId.length; k++) {
					if (empId[k] == "Subtotal") {
						getweekData(parseInt(results[k].Week1),
								getHeadCount(HC1), 1);
						getweekData(parseInt(results[k].Week2),
								getHeadCount(HC2), 2);
						getweekData(parseInt(results[k].Week3),
								getHeadCount(HC3), 3);
						getweekData(parseInt(results[k].Week4),
								getHeadCount(HC4), 4);
						getweekData(parseInt(results[k].Week5),
								getHeadCount(HC5), 5);
						getweekData(parseInt(results[k].Week6),
								getHeadCount(HC6), 6);
						getweekData(parseInt(results[k].Week7),
								getHeadCount(HC7), 7);
						getweekData(parseInt(results[k].Week8),
								getHeadCount(HC8), 8);
						getweekData(parseInt(results[k].Week9),
								getHeadCount(HC9), 9);
						getweekData(parseInt(results[k].Week10),
								getHeadCount(HC10), 10);
						getweekData(parseInt(results[k].Week11),
								getHeadCount(HC11), 11);
						getweekData(parseInt(results[k].Week12),
								getHeadCount(HC12), 12);
						getweekData(parseInt(results[k].Week13),
								getHeadCount(HC13), 13);
					}
				}
				return qArray;
			}
			function getUniqueTeam(results) {
				var List = [];
				for (k = 0; k < results.length; k++) {

					var team = results[k].Team;
					if (results[k].Team != "") {
						List.push(team);
					}
				}
				var uniqueNames = [];
				$.each(List, function(i, el) {
					if ($.inArray(el, uniqueNames) === -1)
						uniqueNames.push(el);
				});
				return uniqueNames;
			}
			function getUniqueEmpID(results) {
				var List = [];
				for (k = 0; k < results.length; k++) {

					var EMP_ID = results[k].EMP_ID;
					if (results[k].EMP_ID != "") {
						List.push(EMP_ID);
					}
				}
				var uniqueNames = [];
				$.each(List, function(i, el) {
					if ($.inArray(el, uniqueNames) === -1)
						uniqueNames.push(el);
				});
				return uniqueNames;
			}
			function getweekData(week, HC, Wn) {
				var fcHours = week;
				var Avl = HC * 40;
				var ute = fcHours / Avl * 100;
				var DHHrs = 21 * 8;
				var DH = DHHrs / Avl * 100;
				var LeaveHrs = 8;
				var Leave = LeaveHrs / Avl * 100
				qArray.push({
					"Weekend" : Wn,
					"HC" : HC,
					"Avl" : Avl,
					"FChours" : fcHours,
					"Buffer" : "",
					"BufferFC" : fcHours,
					"Ute" : ute,
					"DHHrs" : 21 * 8,
					"DH" : DH,
					"LeaveHrs" : 8,
					"Leave" : Leave
				});
			}
			function getHeadCount(test_array) {
			    var index = -1,
			        arr_length = test_array ? test_array.length : 0,
			        resIndex = -1,
			        result = [];

			    while (++index < arr_length) {
			        var value = test_array[index];

			        if (value) {
			            result[++resIndex] = value;
			        }
			    }

			    return result.length-1;
			}
		} ]);
