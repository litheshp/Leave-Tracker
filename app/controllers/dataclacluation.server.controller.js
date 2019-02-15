var employeeData = require('mongoose').model('employeeData');
var calendar = require('mongoose').model('calendar');
var  weeklydata = require('mongoose').model('weeklydata');
var  lookup = require('mongoose').model('lookup');
var unique = require('array-unique');

var moment = require('moment-business-days');
var dataArray = [];
var collection = [];
var HC = 0;
var totalLeaves = 0 ; 
module.exports.getData = function(req,res){
	
	var query = employeeData.find({"StartDate" : {
		"$gte" : new Date(2018, 1, 01),
		"$lt" : new Date(2018, 03, 31)
	}});
	
	getCollection(query,function(){
		res.send(dataArray);
		dataArray =[];
	});
}
exports.list = function(req, res) {
	console.log("inside request list")
	var query = calendar.find({}).sort("order");
	query.exec(function(err, results) {
		res.send(results);
	});
};
exports.listLookups = function(req, res) {
	console.log("inside lookup list")
	var query = lookup.find({});
	query.exec(function(err, results) {
		res.send(results);
	});
};
exports.getMonthStrtnEnd =function(req, res){
	var Mon = req.body.month;
	
	var query = calendar.find({
		month : Mon
	});
	query.exec(function(err, results) {
		console.log(results);
		var last = parseInt(results[0].weeks.length-1);
		res.send({"startdDt":results[0].weeks[0],
			"endDt":results[0].weeks[last]
		});
	});
};
exports.weeklyDatalist = function(req, res) {
	console.log("inside weeklydata list")
	var query = weeklydata.find({}).sort('Team');
	query.exec(function(err, results) {
		res.send(results);
	});
};
exports.updateEmployeeData = function(req, res) {
	var empData =  req.body.empData;
	for(i=0;i<empData.length;i++){
		var query = { Emp_ID: empData[i].Emp_ID };
		employeeData.update(query, { $set:{ Total_Available_Hrs: parseInt(empData[i].Available_Hrs), 
			Name:empData[i].Name,	
			Team:empData[i].Team,
			Project:empData[i].Project,
			Site: empData[i].Site,
			Status: empData[i].Status,
			Total_OT_Hrs:parseInt(empData[i].OT_Hours), 
			Total_Leave_Hours:parseInt(empData[i].Leave_Hrs),
			Utilization:parseFloat(empData[i].utalisation),
			Ute:empData[i].ute,
			Total_Productive_Hrs:parseInt(empData[i].Productive_Hrs),
			Total_DH:parseInt(empData[i].DH),
			Total_Chargeable_Hrs:parseInt(empData[i].Chargeable_Hrs)
		}
		
		},{upsert:true}, function(err, results) {
			//res.send(results);
			//return res.redirect('/pages/importweeklydata.html');
			if(err){
				console.log(err)
				console.log("not updated");
			}else{
				
			}
			
		})
	}
	
}
exports.getWeeklyData = function(req, res) {
	var WeeklyData = [];
	 var week_hours = 0;
	 var Actual_Hours = 0;
	 var OT_Hrs = 0;
	 var Leave_Hours = 0;
	 var utalisation = 0;
	 var ute;
	 
	var weeklyresult =  req.body.week;
	
	
	var query = weeklydata.find({ week_name: weeklyresult});
	query.exec(function(err, results) {
		for(i=0;i<results.length;i++){
			week_hours = week_hours + results[i].week_hours;
			Actual_Hours = Actual_Hours	+ results[i].Actual_Hours;
			OT_Hrs = OT_Hrs + results[i].OT_Hrs;
			Leave_Hours = Leave_Hours + results[i].Leave_Hours;
		}
		utalisation =  Actual_Hours/week_hours*100;
		
		if(utalisation<90){	ute = "<90%";}
		if(utalisation>=90 && utalisation <95){ute = "90%-95%";}
		if(utalisation>=95  && utalisation< 97.5) {ute ="95%-97.5%";}
		if(utalisation>97.5) {ute =">97.5%";}
		
		WeeklyData.push({
			"week":weeklyresult,
			"week_hours" : week_hours,
			"Actual_Hours" : Actual_Hours,
			"OT_Hrs" : OT_Hrs,
			"Leave_Hours" : Leave_Hours,
			"utalisation":utalisation,
			"ute":ute
			})
			//console.log(WeeklyData)
			res.setHeader('Content-Type', 'application/json');
    res.send(WeeklyData);
		
		
	});
	
}

function getCollection(query,callback){
	
	var employeeList = [];
	query.exec(function(err, result) {
		if (err) {  
			console.log(err);
		} else if (result.length > 0) {
			for (k = 0; k < result.length; k++) {
				//totalLeaves = totalLeaves+ result[k].days;
				var empid = result[k].empId;
				employeeList.push(empid);
			}
			employeeList = unique(employeeList);
			HC = employeeList.length;
			console.log(HC);
			for(k = 0; k < result.length; k++){
				var d0 = new Date(result[k].StartDate)
				var d1 = new Date(result[k].EndDate);
				totalLeaves= workingDaysBetweenDates(d0, d1);
				 d0 = new Date(2018, 1, 01)
				 d1 = new Date();
				var d = moment(d1, 'MM-DD-YYYY').businessDiff(moment(d0,'MM-DD-YYYY'));
				var avl = HC * 8 *d;
				var ute = ((avl - (8 * totalLeaves))/avl)*100;
				dur = "Q1";
				dataArray.push({
					"period": k,
			        "leave": totalLeaves / avl * 100,
			        "ute": ute
				})
			}
			collection = result;
			callback();
		}
	});
}
exports.byTeam = function(req, res) {
	var team = req.body.team;
	var location = req.body.location;
	//console.log(team);
	//console.log(location);
	var query;
	if (team != null && location != null) {
		query = weeklydata.find({
			Team : team,
			Site : location
		}).sort("Team");
	}else if(team != null) {
		query = weeklydata.find({
			Team :team
		}).sort("Team");
	}
	else if(location != null) {
		query = weeklydata.find({
			Site :location
		}).sort("Team");
	}
	else {
		query = weeklydata.find({}).sort("Team");
	}

	query.exec(function(err, results) {
		res.send(results);
	});
};
exports.getEmpData =function(req, res){
	var empName = req.body.empName;
	var query = weeklydata.find({
		Name: empName
	});
	query.exec(function(err, results) {
		console.log(results)
		res.send(results);
	});
};
exports.deleteAll = function(req, res) {
	var query = weeklydata.find({}).remove().exec();	
	query = employeeData.find({}).remove().exec();
	res.send("All Records deleted successfully");
	//req.session.message = "All Records deleted successfully"
};
exports.getDataByWeek = function(req,res){
	console.log(req.user)
	
	var week = req.body.week;
	var team = req.body.team;
	var location = req.body.location;
	var project = req.body.project;
	var month = req.body.month;
	var startDt = req.body.startDt;
	var endDt = req.body.endDt;
	
	console.log("month :"+month);
	//console.log("team :"+team);
	//console.log("location :"+location);
	//console.log("project :"+project);
	//console.log("week :"+week);
	
	console.log("startDt :"+startDt);
	console.log("endDt :"+endDt);
	
	var query = weeklydata.find({});
	week != null ? query.where('Week', week):"";
	team != null ? query.where('Team', team):"";
	location != null ? query.where('Site', location):"";
	project != null ? query.where('Project', project):"";
	month!=null?(query.where({"Week" : {"$gte" : new Date(startDt),	"$lte" : new Date(endDt)}})):"";
		
	query.sort("Team").exec(function(err, results) {
		res.setHeader('Content-Type', 'application/json');
	    res.send(JSON.stringify(results, null, 3));
		//console.log(results);
		//res.send(results);
	});
	
}

exports.configUpdate = function(req, res) {
	var query = weeklydata.find({});
	query.exec(function(err, results) {
		
		
		var empIdlist = results.map(function(value) {
			return value.Emp_ID;
		});
		var WeekList = results.map(function(value) {
			return value.Week;
		});
		var empList = results.map(function(value) {
			return value.Name;
		});

		var TeamList = results.map(function(value) {
			return value.Team;
		});

		var LocationList = results.map(function(value) {
			return value.Site;
		});

		var ProjectList = results.map(function(value) {
			return value.Project;
		});
		var len = WeekList.length;								
		var latestWeek =WeekList[len-1];
		empData = calculateByWeek(results);
		
		team = [];
		teamJSON = [];
		ProjectList = unique(ProjectList)

		for (i = 0; i < ProjectList.length; i++) {
			for (j = 0; j < results.length; j++) {
				if (ProjectList[i] == results[j].Project) {
					team.push(results[j].Team);
				}
			}
			teamJSON.push(unique(team))
			team = []
		}
		
		 empIdlist =      unique(empIdlist);
		 WeekList =      unique(WeekList);
		 empList =      unique(empList);
		 TeamList =      unique(TeamList);
		 LocationList =      unique(LocationList);
		 ProjectList =      unique(ProjectList);
		 teamData =      teamJSON;

		var config = [];
		config.push({
			"empIdlist" : (empIdlist),
			"WeekList" : (WeekList),
			"empList" : (empList),
			"TeamList" : (TeamList),
			"LocationList" : (LocationList),
			"ProjectList" : (ProjectList),
			"teamData" : teamJSON
		})
		
		var query = {};
		lookup.update(query, {
			$set : {
				"empIdlist" : (empIdlist),
				"WeekList" : (WeekList),
				"empList" : (empList),
				"TeamList" : (TeamList),
				"LocationList" : (LocationList),
				"ProjectList" : (ProjectList),
				"teamData" : teamJSON
			}

		}, {
			upsert : true
		}, function(err, results) {
			updateEmployeeData(empData)
			return res.redirect('/pages/importweeklydata.html');
			//return res.redirect('/calculate/getDataByWeek');
			//res.send("Imported all the records")
			if (err) {
				console.log(err)
				console.log("lookup not updated");
			} else {

			}

		})
	})

}

function calculateByWeek(results) {
	//console.log("latestweek "+latestweek);
	//var query = weeklydata.find({Week:latestweek});
	//query.exec(function(err, results) {
		
	
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
	var AllEmplist = results.map(function(value) {
		return value.Emp_ID;
	});
	var empIdlist = unique(AllEmplist);
	//console.log(empIdlist)
	for (i = 0; i < empIdlist.length; i++) {
		for (j = 0; j < results.length; j++) {
			if (results[j].Emp_ID == empIdlist[i]) {
				name = results[j].Name;
				Project = results[j].Project;
				Status = results[j].Emp_Status;
				Team = results[j].Team;
				Site = results[j].Site;
				Available_Hrs = Available_Hrs + results[j].Available_Hrs;
				Productive_Hrs = Productive_Hrs + results[j].Productive_Hrs;
				OT_Hours = OT_Hours + results[j].OT_Hours;
				Leave_Hrs = Leave_Hrs + results[j].Leave_Hrs;
				Chargeable_Hrs = Chargeable_Hrs + results[j].Chargeable_Hrs;
				DH = DH + results[j].DH;
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
	//updateEmployeeData (employeeData)
	return (employeeData);
	console.log("Completed");
//}
//);
}

function updateEmployeeData (empData) {
	for(i=0;i<empData.length;i++){
		var query = { Emp_ID: empData[i].Emp_ID };
		employeeData.update(query, { $set:{ Total_Available_Hrs: parseInt(empData[i].Available_Hrs), 
			Name:empData[i].Name,	
			Team:empData[i].Team,
			Project:empData[i].Project,
			Site: empData[i].Site,
			Status: empData[i].Status,
			Total_OT_Hrs:parseInt(empData[i].OT_Hours), 
			Total_Leave_Hours:parseInt(empData[i].Leave_Hrs),
			Utilization:parseFloat(empData[i].utalisation),
			Ute:empData[i].ute,
			Total_Productive_Hrs:parseInt(empData[i].Productive_Hrs),
			Total_DH:parseInt(empData[i].DH),
			Total_Chargeable_Hrs:parseInt(empData[i].Chargeable_Hrs)
		}
		
		},{upsert:true}, function(err, results) {
			
			
			if(err){
				console.log(err)
				console.log("not updated");
			}else{
				
			}
			
		})
	}
	
}
