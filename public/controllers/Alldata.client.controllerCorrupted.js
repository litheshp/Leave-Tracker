dataApp.controller('AlldataController',				[
						'$scope',
						'$resource',
						'$http',
						function($scope, $resource, $http) {
							document.getElementById("overlay").style.display = "block";
							var data = $resource('/api/list');
							var calCulatedata = $resource('/calculate/list');
							calCulatedata.query(function(results) {
								$scope.calculatedata = results;
								// console.log(results);

								var empIdlist = results.map(function(value) {
									return value.Emp_ID;
								});
								var WeekList = results.map(function(value) {
									return value.Week;
								});
								var empList = results.map(function(value) {
									return value.Name;
								});
								
								
								$scope.WeekList = getUniqueData(WeekList);
								$scope.empIdlist = getUniqueData(empIdlist);
								$scope.empList = getUniqueData(empList);
								
								//$scope.dataList = calculateByWeek(results);
								//$scope.totalUTE = calculateTotalUTE($scope.dataList);
								
								var len = $scope.WeekList.length;								
								var latestWeek =$scope.WeekList[len-1];
								latestWeekArray =[];
								//alert(latestWeek);
								for(i=0;i<results.length;i++){
									if(results[i].Week == latestWeek){
										latestWeekArray.push(results[i]);
									}
								}
								
								
								$scope.latestWeek = latestWeek
								$scope.dataList = calculateByWeek(latestWeekArray);
								$scope.totalUTE = calculateTotalUTE(latestWeekArray);
								
								document.getElementById("overlay").style.display = "none";
							
							})
							data.query(function(results) {
										//$scope.dataList = calculateUTE(results);
										//$scope.totalUTE = calculateTotalUTE($scope.dataList);

										var TeamList = results.map(function(value) {
											return value.Team;
										});
										
										var LocationList = results.map(function(value) {
													return value.Site;
												});

										var ProjectList = results.map(function(
												value) {
											return value.Project;
										});

										
										$scope.LocationList = getUniqueData(LocationList);
										$scope.ProjectList = getUniqueData(ProjectList);
										$scope.TeamList = getUniqueData(TeamList);
										 team = [];
										 teamJSON = [];
										for(i=0;i<$scope.ProjectList.length;i++){
											for(j=0;j<results.length;j++){
												if($scope.ProjectList[i] == results[j].Project){
													team.push(results[j].Team);
												}
											}
											var projectname = "'"+$scope.ProjectList[i]+"'"
											alert(projectname)
											teamJSON.push({ getUniqueData(team) })
											team =[];
										}
										console.log(teamJSON)
										/*nameArray = [];
										for (i = 0; i < $scope.TeamList.length; i++) {
											nameArray.push({
												"label" : $scope.TeamList[i],
												"value" : 3,

											});
										}

										Morris.Donut({
											element : 'morris-donut-chart',
											data: [{
									            label: "Productive Ute",
									            value: $scope.totalUTE[0].Productive_Ute.toFixed(2)
									        }, {
									            label: "Chargeable Ute",
									            value: $scope.totalUTE[0].Chargeable_Ute.toFixed(2)
									        }, {
									            label: "OT %",
									            value: $scope.totalUTE[0].OT_Per.toFixed(2)
									        },
									        {
									            label: "Leave %",
									            value: $scope.totalUTE[0].Leave_Per.toFixed(2)
									        },
									        {
									            label: "DH %",
									            value: $scope.totalUTE[0].DH_Per.toFixed(2)
									        }],
											resize : true
										});
										 Morris.Bar({
										        element: 'morris-bar-chart',
										        data: [{
										            y: "Productive Ute",
										            a: $scope.totalUTE[0].Productive_Ute.toFixed(2)
										        }, 
										        {
										            y: "Chargeable Ute",
										            a: $scope.totalUTE[0].Chargeable_Ute.toFixed(2)
										        }, {
										            y: "OT %",
										            a: $scope.totalUTE[0].OT_Per.toFixed(2)
										        }, {
										            y: "Leave %",
										            a: $scope.totalUTE[0].Leave_Per.toFixed(2)
										        }, {
										            y: "DH %",
										            a: $scope.totalUTE[0].DH_Per.toFixed(2)
										        }],
										        xkey: 'y',
										        ykeys: 'a',
										        labels: ['Percentage'],
										        hideHover: 'auto',
										        resize: true
										    });*/
									});
							$scope.byDuration = function() {
								switch ($scope.duration) {

								case "Monthly":

									$scope.Monthly = true;
									$scope.Weekly = false;
									$scope.Quarterly = false;
									$scope.Till = false;
									$scope.Week = undefined;
									$scope.Quarter = undefined;
									break;
								case "Weekly":
									$scope.Weekly = true;
									$scope.Monthly = false;
									$scope.Quarterly = false;
									$scope.Till = false;
									$scope.Month = undefined;
									$scope.Quarter = undefined;

									break;
								case "Quarterly":
									$scope.Quarterly = true;
									$scope.Weekly = false;
									$scope.Monthly = false;
									$scope.Till = false;
									$scope.Month = undefined;
									$scope.Week = undefined;
									break;
								default:
									$scope.Till = true;
									$scope.Quarterly = false;
									$scope.Weekly = false;
									$scope.Monthly = false;
									$scope.Month = undefined;
									$scope.byTeam();
									break;

								}

							}
							$scope.byTeam = function() {
								document.getElementById("overlay").style.display = "block";
								$scope.latestWeek = null
								switch ($scope.duration) {

								case "Monthly":

									$scope.Monthly = true;
									$scope.Weekly = false;
									$scope.Quarterly = false;
									$scope.Till = false;
									$scope.Week = undefined;
									$scope.Quarter = undefined;
									break;
								case "Weekly":
									$scope.Weekly = true;
									$scope.Monthly = false;
									$scope.Quarterly = false;
									$scope.Till = false;
									$scope.Month = undefined;
									$scope.Quarter = undefined;

									break;
								case "Quarterly":
									$scope.Quarterly = true;
									$scope.Weekly = false;
									$scope.Monthly = false;
									$scope.Till = false;
									$scope.Month = undefined;
									$scope.Week = undefined;
									break;
								default:
									$scope.Till = true;
									$scope.Quarterly = false;
									$scope.Weekly = false;
									$scope.Monthly = false;
									$scope.Month = undefined;
									break;

								}
								if ($scope.Month != undefined || $scope.Quarter != undefined) {
									// alert("Monthly")
									var dat = $scope.Month != undefined ? $scope.Month
											: $scope.Quarter != undefined ? $scope.Quarter
													: ""
									$http.post('/calendar/getMonthStrtnEnd',
													{
														month : dat
													})
											.success(
													function(results) {
														//console.log(results)
														$http.post('/calculate/getDataByWeek',
																		{
																			team : $scope.team,
																			location : $scope.Location,
																			duration : $scope.duration,
																			week : $scope.Week,
																			project : $scope.Project,
																			month : dat,
																			startDt : results.startdDt,
																			endDt : results.endDt
																		})
																.success(
																		function(results) {
																			$scope.dataList = calculateByWeek(results);
																			$scope.totalUTE = calculateTotalUTE($scope.dataList);
																			document.getElementById("overlay").style.display = "none";
																		})
													})
								} else {
									$http.post('/calculate/getDataByWeek', {
												team : $scope.team,
												location : $scope.Location,
												duration : $scope.duration,
												week : $scope.Week,
												month : $scope.Month,
												project : $scope.Project
											})
											.success(
													function(results) {
														$scope.dataList = calculateByWeek(results);
														$scope.totalUTE = calculateTotalUTE($scope.dataList);
														document.getElementById("overlay").style.display = "none";
													})
								}

								/*
								 * $http.post('/api/list', { team : $scope.team,
								 * location : $scope.Location, duration :
								 * $scope.duration, project : $scope.Project }) //
								 * PASS THE DATA AS THE SECOND PARAMETER
								 * .success(function(results) { $scope.dataList =
								 * calculateUTE(results); $scope.totalUTE =
								 * calculateTotalUTE($scope.dataList);
								 * }).error(function(error) {
								 * console.log(error); });
								 */

							}
							$scope.getEmployeeData = function(data) {
								var Available_Hrs = 0;
								var Actual_Hours = 0;
								var OT_Hours = 0;
								var Leave_Hrs = 0;
								var Productive_Hrs = 0;
								var Chargeable_Hrs = 0;
								var utalisation = 0;
								var DH = 0;
								var Productive_Ute = 0;
								var Chargeable_Ute = 0;
								var OT_Per = 0;
								var Leave_Per = 0;
								var DH_Per = 0;
								$scope.dataIndividual = "";
								var dataIndividual = [];
								$http.post('/calculate/getEmpData', {
											empName : data
										})
										// PASS THE DATA AS THE SECOND PARAMETER
										.success(
												function(results) {
													$scope.empDetails = results;
													for (i = 0; i < results.length; i++) {
														Available_Hrs = Available_Hrs+ results[i].Available_Hrs;
														Productive_Hrs = Productive_Hrs+ results[i].Productive_Hrs;
														OT_Hours = OT_Hours+ results[i].OT_Hours;
														Leave_Hrs = Leave_Hrs+ results[i].Leave_Hrs;
														Chargeable_Hrs = Chargeable_Hrs+ results[i].Chargeable_Hrs;
														DH = DH + results[i].DH;

													}
													Productive_Ute = Productive_Hrs	/ Available_Hrs	* 100;
													Chargeable_Ute = Chargeable_Hrs/ Available_Hrs* 100;
													OT_Per = OT_Hours/ Available_Hrs* 100;
													Leave_Per = Leave_Hrs/ Available_Hrs* 100;
													DH_Per = DH / Available_Hrs* 100;

													dataIndividual
															.push({
																"Name" : results[0].Name,
																"Status" : results[0].Emp_Status,
																"Team" : results[0].Team,
																"Site" : results[0].Site,
																"Project" : results[0].Project,
																"Emp_ID" : results[0].Emp_ID,
																"Available_Hrs" : Available_Hrs,
																"OT_Hours" : OT_Hours,
																"Leave_Hrs" : Leave_Hrs,
																"Productive_Hrs" : Productive_Hrs,
																"DH" : DH,
																"Chargeable_Hrs" : Chargeable_Hrs,
																"Productive_Ute" : Productive_Ute,
																"Chargeable_Ute" : Chargeable_Ute,
																"OT_Per" : OT_Per,
																"Leave_Per" : Leave_Per,
																"DH_Per" : DH_Per
															});
													Available_Hrs = 0;
													OT_Hours = 0;
													Leave_Hrs = 0;
													Chargeable_Hrs = 0;
													DH = 0;
													Productive_Hrs = 0;
													$scope.dataIndividual = dataIndividual;

												}).error(function(error) {
											console.log(error);
										});

							}
							$scope.calculateEmployeeData = function(data) {
								document.getElementById("overlay").style.display = "block";
								var employeeData = [];
								var Available_Hrs = 0;
								var Actual_Hours = 0;
								var OT_Hours = 0;
								var Leave_Hrs = 0;
								var Productive_Hrs = 0;
								var Chargeable_Hrs = 0;
								var utalisation = 0;
								var ute;
								var DH = 0;
								var name;
								var weeklyData = $scope.calculatedata;
								var empIdlist = $scope.empIdlist;
								console.log(empIdlist)
								for (i = 0; i < empIdlist.length; i++) {
									for (j = 0; j < weeklyData.length; j++) {
										if (weeklyData[j].Emp_ID == empIdlist[i]) {
											name = weeklyData[j].Name;
											Project = weeklyData[j].Project;
											Status = weeklyData[j].Emp_Status;
											Team = weeklyData[j].Team;
											Site = weeklyData[j].Site;
											Available_Hrs = Available_Hrs
													+ weeklyData[j].Available_Hrs;
											Productive_Hrs = Productive_Hrs
													+ weeklyData[j].Productive_Hrs;
											OT_Hours = OT_Hours
													+ weeklyData[j].OT_Hours;
											Leave_Hrs = Leave_Hrs
													+ weeklyData[j].Leave_Hrs;
											Chargeable_Hrs = Chargeable_Hrs
													+ weeklyData[j].Chargeable_Hrs;
											DH = DH + weeklyData[j].DH;
										}
									}
									utalisation = Chargeable_Hrs
											/ Available_Hrs * 100;

									if (utalisation < 90) {
										ute = "<90%";
									}
									if (utalisation >= 90 && utalisation < 95) {
										ute = "90%-95%";
									}
									if (utalisation >= 95 && utalisation < 97.5) {
										ute = "95%-97.5%";
									}
									if (utalisation > 97.5) {
										ute = ">97.5%";
									}

									employeeData.push({
										"Name" : name,
										"Project" : Project,
										"Status" : Status,
										"Team" : Team,
										"Site" : Site,
										"Emp_ID" : empIdlist[i],
										"Available_Hrs" : Available_Hrs,
										"OT_Hours" : OT_Hours,
										"Leave_Hrs" : Leave_Hrs,
										"Productive_Hrs" : Productive_Hrs,
										"utalisation" : utalisation,
										"ute" : ute,
										"DH" : DH,
										"Chargeable_Hrs" : Chargeable_Hrs
									});
									Available_Hrs = 0;
									OT_Hours = 0;
									Leave_Hrs = 0;
									Chargeable_Hrs = 0;
									DH = 0;
									Productive_Hrs = 0;

								}
								console.log(employeeData);

								$http.post('/calculate/updateEmployeeUTE', {
									empData : employeeData
								}) // PASS THE DATA AS THE SECOND PARAMETER
								.success(function(results) {
									$scope.empDetails = results;
									alert("Calculation completed successfully")
								}).error(function(error) {
									console.log(error);
								});
								document.getElementById("overlay").style.display = "none";
							}
							/*
							 * $scope.getWeeklyData = function(month){ var data =
							 * [];
							 * 
							 * 
							 * $http.post('/api/getWeeklyData', {Mon:month}) //
							 * PASS THE DATA AS THE SECOND PARAMETER
							 * .success(function(results){
							 * //console.log(results); $scope.WeeklyData =
							 * results; for(k=0;k<results[0].weeks.length;k++){
							 * $http.post('/calculate/getWeeklyData',
							 * {week:results[0].weeks[k]})
							 * .success(function(results){ console.log(results)
							 * data.push(results.utalisation); }) } }) .error(
							 * function(error){ console.log(error); });
							 * 
							 * $scope.weeklyDataFull= data; console.log(data) }
							 */

							$scope.WeeklyDetails = function(w) {
								$http.post('/calculate/getWeeklyData', {
									week : w
								}).success(function(results) {
									$scope.WeeklyDataUTE = results;
									// console.log(results)
								})
							}

							$scope.filter = function() {
								$http.post('/calculate/filter', {
									team : $scope.team,
									location : $scope.Location,
									duration : $scope.duration
								}).success(function(results) {
									$scope.filteredData = results;
									// console.log(results)
								})
							}
							$scope.getDataByWeek = function() {
								$http
										.post('/calculate/getDataByWeek', {
											team : $scope.team,
											location : $scope.Location,
											duration : $scope.duration,
											week : $scope.Week,
											project : $scope.Project
										})
										.success(
												function(results) {
													// $scope.WeeklyDataUTE =
													// results;
													// console.log(results)

													$scope.dataList = calculateByWeek(results);
													$scope.totalUTE = calculateTotalUTE($scope.dataList);
												})
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

						} ]);
function getUniqueData(List) {
	var uniqueNames = [];
	$.each(List, function(i, el) {
		if ($.inArray(el, uniqueNames) === -1)
			uniqueNames.push(el);
	});
	return uniqueNames;
}

function calculateUTE(results) {

	var Productive_Ute = 0;
	var Chargeable_Ute = 0;
	var OT_Per = 0;
	var Leave_Per = 0;
	var DH_Per = 0;
	var dataIndividual = [];

	for (i = 0; i < results.length; i++) {

		Productive_Ute = results[i].Total_Productive_Hrs/ results[i].Total_Available_Hrs * 100;
		Chargeable_Ute = results[i].Total_Chargeable_Hrs/ results[i].Total_Available_Hrs * 100;
		OT_Per = results[i].Total_OT_Hrs / results[i].Total_Available_Hrs * 100;
		Leave_Per = results[i].Total_Leave_Hours/ results[i].Total_Available_Hrs * 100;
		DH_Per = results[i].Total_DH / results[i].Total_Available_Hrs * 100;

		dataIndividual.push({
			"Name" : results[i].Name,
			"Status" : results[i].Emp_Status,
			"Team" : results[i].Team,
			"Site" : results[i].Site,
			"Project" : results[i].Project,
			"Emp_ID" : results[i].Emp_ID,
			"Available_Hrs" : results[i].Total_Available_Hrs,
			"OT_Hours" : results[i].Total_OT_Hrs,
			"Leave_Hrs" : results[i].Total_Leave_Hours,
			"Productive_Hrs" : results[i].Total_Productive_Hrs,
			"DH" : results[i].Total_DH,
			"Chargeable_Hrs" : results[i].Total_Chargeable_Hrs,
			"Productive_Ute" : Productive_Ute,
			"Chargeable_Ute" : Chargeable_Ute,
			"OT_Per" : OT_Per,
			"Leave_Per" : Leave_Per,
			"DH_Per" : DH_Per
		});

	}

	console.log(dataIndividual)
	return (dataIndividual);

}
function calculateTotalUTE(results) {
	var Total = [];
	var Productive_Ute = 0;
	var Chargeable_Ute = 0;
	var OT_Per = 0;
	var Leave_Per = 0;
	var DH_Per = 0;
	var Available_Hrs = 0;

	for (i = 0; i < results.length; i++) {

		Productive_Ute = Productive_Ute + results[i].Productive_Hrs
		Chargeable_Ute = Chargeable_Ute + results[i].Chargeable_Hrs;
		Available_Hrs = Available_Hrs + results[i].Available_Hrs
		OT_Per = OT_Per + results[i].OT_Hours;
		Leave_Per = Leave_Per + results[i].Leave_Hrs;
		DH_Per = DH_Per + results[i].DH;
	}

	Total.push({
		"Productive_Ute" : Productive_Ute / Available_Hrs * 100,
		"Chargeable_Ute" : Chargeable_Ute / Available_Hrs * 100,
		"OT_Per" : OT_Per / Available_Hrs * 100,
		"Leave_Per" : Leave_Per / Available_Hrs * 100,
		"DH_Per" : DH_Per / Available_Hrs * 100
	})
	return (Total);

}
function calculateByWeek(weeklyData) {
	var employeeData = [];
	var Available_Hrs = 0;
	var Actual_Hours = 0;
	var OT_Hours = 0;
	var Leave_Hrs = 0;
	var Productive_Hrs = 0;
	var Chargeable_Hrs = 0;
	var utalisation = 0;
	var ute;
	var DH = 0;
	var name;
	var AllEmplist = weeklyData.map(function(value) {
		return value.Emp_ID;
	});
	var empIdlist = getUniqueData(AllEmplist);
	console.log(empIdlist)
	for (i = 0; i < empIdlist.length; i++) {
		for (j = 0; j < weeklyData.length; j++) {
			if (weeklyData[j].Emp_ID == empIdlist[i]) {
				name = weeklyData[j].Name;
				Project = weeklyData[j].Project;
				Status = weeklyData[j].Emp_Status;
				Team = weeklyData[j].Team;
				Site = weeklyData[j].Site;
				Available_Hrs = Available_Hrs + weeklyData[j].Available_Hrs;
				Productive_Hrs = Productive_Hrs + weeklyData[j].Productive_Hrs;
				OT_Hours = OT_Hours + weeklyData[j].OT_Hours;
				Leave_Hrs = Leave_Hrs + weeklyData[j].Leave_Hrs;
				Chargeable_Hrs = Chargeable_Hrs + weeklyData[j].Chargeable_Hrs;
				DH = DH + weeklyData[j].DH;
			}
		}
		Productive_Ute = Productive_Hrs/ Available_Hrs * 100;
		Chargeable_Ute = Chargeable_Hrs/Available_Hrs * 100;
		OT_Per = OT_Hours / Available_Hrs * 100;
		Leave_Per = Leave_Hrs/ Available_Hrs * 100;
		DH_Per = DH / Available_Hrs * 100;
		utalisation = Chargeable_Hrs / Available_Hrs * 100;

		if (utalisation < 90) {
			ute = "<90%";
		}
		if (utalisation >= 90 && utalisation < 95) {
			ute = "90%-95%";
		}
		if (utalisation >= 95 && utalisation < 97.5) {
			ute = "95%-97.5%";
		}
		if (utalisation > 97.5) {
			ute = ">97.5%";
		}

		employeeData.push({
			"Name" : name,
			"Project" : Project,
			"Status" : Status,
			"Team" : Team,
			"Site" : Site,
			"Emp_ID" : empIdlist[i],
			"Available_Hrs" : Available_Hrs,
			"OT_Hours" : OT_Hours,
			"Leave_Hrs" : Leave_Hrs,
			"Productive_Hrs" : Productive_Hrs,
			"utalisation" : utalisation,
			"ute" : ute,
			"DH" : DH,
			"Chargeable_Hrs" : Chargeable_Hrs,
			"Productive_Ute" : Productive_Ute,
			"Chargeable_Ute" : Chargeable_Ute,
			"OT_Per" : OT_Per,
			"Leave_Per" : Leave_Per,
			"DH_Per" : DH_Per
		});
		Available_Hrs = 0;
		OT_Hours = 0;
		Leave_Hrs = 0;
		Chargeable_Hrs = 0;
		DH = 0;
		Productive_Hrs = 0;

	}
	// console.log(employeeData);
	return (employeeData);

}
