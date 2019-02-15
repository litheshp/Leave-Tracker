dataApp.controller('AlldataController', ['$scope', '$resource','$http', function ($scope, $resource,$http) {
  var data =$resource('/api/list');
  var calCulatedata =$resource('/calculate/list');
  data.query(function (results) {
	    $scope.dataList = results;
	    var empList = results.map(function(value) {
			return value.Name;
		});
	   
	    var TeamList = results.map(function(value) {
			return value.LOB;
		});
	    var LocationList = results.map(function(value) {
			return value.Site;
		});
	    $scope.empList = getUniqueData(empList);
	    $scope.TeamList = getUniqueData(TeamList);
	    $scope.LocationList = getUniqueData(LocationList);
//	    Morris.Donut({
//	        element: 'morris-donut-chart',
//	        data: results[0].nameArray,
//	        resize: true
//	    });
	  });
  calCulatedata.query(function (results) {
	  $scope.calculatedata = results;
	  var empIdlist = results.map(function(value) {
			return value.Emp_ID;
		});
	  $scope.empIdlist = getUniqueData(empIdlist);
  })
  
  $scope.byTeam = function(){
	 $http.post('/api/list', {team:$scope.team ,location:$scope.Location ,duration:$scope.duration}) // PASS THE DATA AS THE SECOND PARAMETER
    .success(
        function(results){
        	var empList = results.map(function(value) {
    			return value.Name;
    		});
        	
    	    $scope.empList = getUniqueData(empList);
    	   
    	    switch($scope.duration){
    	    
    	    case "Monthly": 
    	    	$scope.Monthly = true;
    	    	$scope.Weekly = false;
    	    	$scope.Quarterly = false;
    	    	$scope.Till  = false;
    	    	$scope.month =""
    	    	break;
    	    case "Weekly": 
    	    	$scope.Weekly = true;
    	    	$scope.Monthly = false;
    	    	$scope.Quarterly = false; 
    	    	$scope.Till  = false;
    	    	break;
    	    case "Quarterly":
    	    	$scope.Quarterly = true; 
    	    	$scope.Weekly = false;
    	    	$scope.Monthly = false;
    	    	$scope.Till  = false;
    	    	$scope.month =""
    	    	break;
    	    default:
    	    	$scope.Till  = true;
    	    $scope.Quarterly = false; 
	    	$scope.Weekly = false;
	    	$scope.Monthly = false;
	    	$scope.month =""
    	    break;
    	    
    	    }
    	    
    	    
        })
    .error(
        function(error){
            console.log(error);
        });
   }
  $scope.getEmployeeData = function(data){
		 $http.post('/api/getEmpData', {empName:data}) // PASS THE DATA AS THE SECOND PARAMETER
	    .success(function(results){
	    	$scope.empDetails = results;
	    })
		 .error(
			        function(error){
			            console.log(error);
			        });
  
  }
  $scope.calculateEmployeeData = function(data){
	  var employeeData = [];
	  var week_hours = 0;
	 var Actual_Hours = 0;
	 var OT_Hrs = 0;
	 var Leave_Hours = 0;
	 
	 var utalisation = 0;
	 var ute;
	 var weeklyData =  $scope.calculatedata;
	 var empIdlist = $scope.empIdlist;
	 for (i = 0; i < empIdlist.length; i++) {
					for (j = 0; j < weeklyData.length; j++) {
						if (weeklyData[j].Emp_ID == empIdlist[i]) {
							
							week_hours = week_hours + weeklyData[j].week_hours;
							Actual_Hours = Actual_Hours	+ weeklyData[j].Actual_Hours;
							OT_Hrs = OT_Hrs + weeklyData[j].OT_Hrs;
							Leave_Hours = Leave_Hours + weeklyData[j].Leave_Hours;
						}
					}
					utalisation =  Actual_Hours/week_hours*100;
					
					if(utalisation<90){	ute = "<90%";}
					if(utalisation>=90 && utalisation <95){ute = "90%-95%";}
					if(utalisation>=95  && utalisation< 97.5) {ute ="95%-97.5%";}
					if(utalisation>97.5) {ute =">97.5%";}
							
					employeeData.push({
						"Emp_ID" : empIdlist[i],
						"week_hours" : week_hours,
						"Actual_Hours" : Actual_Hours,
						"OT_Hrs" : OT_Hrs,
						"Leave_Hours" : Leave_Hours,
						
						"utalisation":utalisation,
						"ute" : ute
					});
					 week_hours = 0;
					 Actual_Hours = 0;
					OT_Hrs = 0;
					Leave_Hours = 0;
					
					
				}
	 console.log(employeeData);
	 
		 $http.post('/calculate/updateEmployeeUTE', {empData:employeeData}) // PASS THE DATA AS THE SECOND PARAMETER
	    .success(function(results){
	    	$scope.empDetails = results;
	    })
		 .error(
			        function(error){
			            console.log(error);
			        });

}
  $scope.getWeeklyData = function(month){
	  var data =  [];
	 

		 $http.post('/api/getWeeklyData', {Mon:month}) // PASS THE DATA AS THE SECOND PARAMETER
	    .success(function(results){
	    	//console.log(results);
	    	  	$scope.WeeklyData = results;
	    	  		  	for(k=0;k<results[0].weeks.length;k++){
	    	  		$http.post('/calculate/getWeeklyData', {week:results[0].weeks[k]})
		    	  	.success(function(results){
		    	  		console.log(results)
		    	  		 data.push(results.utalisation);
		    	  	})
	    	  	}
	    	  	
	    	  	
	    })
		 .error(
			        function(error){
			            console.log(error);
			        });
		 
		 $scope.weeklyDataFull= data;
		 console.log(data)
		 
}
  
 $scope.WeeklyDetails = function(w){
	 $http.post('/calculate/getWeeklyData', {week:w})
	  	.success(function(results){
	  		$scope.WeeklyDataUTE = results;
	  		//console.log(results)
	  	})
 }

}]);
function getUniqueData(List) {
	var uniqueNames = [];
	$.each(List, function(i, el) {
		if ($.inArray(el, uniqueNames) === -1)
			uniqueNames.push(el);
	});
	return uniqueNames;
}
