var Request = require('mongoose').model('Request');
var data = require('mongoose').model('data');
var configdoc = require('mongoose').model('configdoc');
var unique = require('array-unique');
var moment = require('moment-business-days');
var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
		case 11000:
		case 11001:
			message = 'Username already exists';
			break;
		default:
			message = 'Something went wrong';
		}
	} else {
		for ( var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}
	return message;
};


exports.newRequest = function(req, res) {
	if (!req.FirstName) {
		console.log(req.body);
		var request = new Request(req.body);
		var message = null;
		request.Status = 'Submitted';
		request.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/');
			}
		});
	}
	return res.redirect('/');
};
exports.list = function(req, res) {
	console.log("inside request list")
	var query = Request.find({}).sort("StartDate");
	query.exec(function(err, results) {
		res.send(results);
	});
};

exports.dataList = function(req, res) {
	
	var query = data.find({}).sort('order');
	query.exec(function(err, results) {
		
		res.send(results);
	});
};

exports.data = function(req, res) {
	var id = req.body.id;
	var query = Request.find({_id:id});
	console.log(id)
	query.exec(function(err, results) {
		console.log(results)
		res.send(results);
		
	});
}

var dataset = [];
exports.getData = function(req, res) {
	console.log("inside get data")
	var a = req.body.quarter;
	var team = req.body.team;

	queryCollection(Request, a,team, function() {
		console.log("Quarter :"+a);

		var employeeList = [];
		var nameArray = [];
		var leaves = [];
		var totalLeaves =0;
		  if (rest.length >0) {

			for (k = 0; k < rest.length; k++) {

				var empid = rest[k].empId;
				employeeList.push(empid);
				totalLeaves = totalLeaves+ rest[k].days;
			}

			console.log("totalLeaves " +totalLeaves);
			employeeList = unique(employeeList)
			console.log(employeeList);
			for (i = 0; i < employeeList.length; i++) {
				var leave = 0;
				for (k = 0; k < rest.length; k++) {

					if (employeeList[i] == rest[k].empId) {
						// console.log(employeeList[i]);
						leave = leave + rest[k].days;
						name = rest[k].FirstName + " " + rest[k].SecondName;
						team = rest[k].team;

						// console.log(rest[k].days);
						// console.log(leave);
					}
				}
				var HC = employeeList.length;
				//var m = (a>4 || isNaN(a)? 4 :a);
				var w = 13;
				var d0 = new Date(2018, 01, 01);
				var d1;
				switch(a){
				case "1": d1 = new Date(2018, 03, 31);break;
				case "2": d1 = new Date(2018, 06, 30);break;
				case "3": d1 = new Date(2018, 09, 30);break;
				case "4": d1 = new Date(2018, 12, 31);break;
				default: d1 = new Date();
					
				}
				//var d= workingDaysBetweenDates(d0, d1);
				var d = moment(d1, 'MM-DD-YYYY').businessDiff(moment(d0,'MM-DD-YYYY'));
				console.log(d1);
				console.log("working days using moment: "+ d);
				var avl = HC * 8*d;
				var bill = avl-(8 * totalLeaves);
				var LFC = totalLeaves*8 / avl * 100;
				console.log("Available hrs: "+avl);
				nameArray.push({
					"label" : name,
					"value" : leave,
					"days" : leave,
					"team" : team
				});
			}
			var ute = ((avl - (8 * totalLeaves))/avl)*100;
			var dur = (a <= 4 ? "Up to Q" + a : "Up to Today");
			dataset.push({
				"nameArray" : nameArray,
				"quarter" : dur,
				"value" : LFC,
				"ute" : ute,
				"billable":bill,
				"available":avl
			})

			
		}
		res.send(dataset);
		nameArray = [];
		employeeList = [];
		dataset = [];
	});

}
var rest = [];
function queryCollection(collection, quarter,team, callback) {
	switch (quarter) {
	case "1":
		collection.find({
			"StartDate" : {
				"$gte" : new Date(2018, 01, 01),
				"$lt" : new Date(2018, 03, 31)
			}
		}).exec(function(err, result) {
			if (err) {
				console.log(err);
			} else if (result.length > 0) {
				rest = result;
				callback();
			}
		});
		break;
	case "2":
		collection.find({
			"StartDate" : {
				"$gte" : new Date(2018, 1, 01),
				"$lt" : new Date(2018, 6, 30)
			}
		}).exec(function(err, result) {
			if (err) {
				console.log(err);
			} else if (result.length > 0) {
				rest = result;
				callback();
			}
		});
		break;
	case "3":
		collection.find({
			"StartDate" : {
				"$gte" : new Date(2018, 1, 01),
				"$lt" : new Date(2018, 9, 31)
			}
		}).exec(function(err, result) {
			if (err) {
				console.log(err);
			} else if (result.length > 0) {
				rest = result;
				callback();
			}
		});
		break;
	case "4":
		collection.find({
			"StartDate" : {
				"$gte" : new Date(2018, 1, 01),
				"$lt" : new Date(2018, 12, 31)
			}
		}).exec(function(err, result) {
			if (err) {
				console.log(err);
			} else if (result.length > 0) {
				rest = result;
				callback();
			}
		});
		break;
	default:
		collection.find({
			"StartDate" : {
				"$gte" : new Date(2018, 1, 01),
				"$lt" : new Date()
			}
		}).exec(function(err, result) {
			if (err) {
				console.log(err);
			} else if (result.length > 0) {
				rest = result;
				callback();
			}
		});

	}

}
