var Request = require('mongoose').model('Request');
var configdoc = require('mongoose').model('configdoc');
var unique = require('array-unique');
var moment = require('moment-business-days');
var dataArray = [];
var collection = [];
var HC = 0;
var totalLeaves = 0 ; 
module.exports.getData = function(req,res){
	
	var query = Request.find({"StartDate" : {
		"$gte" : new Date(2018, 1, 01),
		"$lt" : new Date(2018, 03, 31)
	}});
	
	getCollection(query,function(){
		console.log(dataArray);
		res.send(dataArray);
		dataArray =[];
	});
}
exports.list = function(req, res) {
	console.log("inside request list")
	var query = configdoc.find({}).sort("order");
	query.exec(function(err, results) {
		res.send(results);
	});
};
exports.newConfig = function(req, res) {
	if (!req.title) {
		console.log(req.body);
		var config = new configdoc(req.body);
		var message = null;
		config.value = req.body.value.split(",");
		config.save(function(err) {
			if (err) {
				req.flash('error', message);
				return res.redirect('/');
			}
		});
	}
	return res.redirect('/');
};
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


