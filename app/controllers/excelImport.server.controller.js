var multer = require('multer');
var model = require('mongoose').model('Importdata');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var storage = multer.diskStorage({ // multers disk storage settings
	destination : function(req, file, cb) {
		cb(null, './uploads/')
	},
	filename : function(req, file, cb) {
		var datetimestamp = Date.now();
		cb(null,
				file.fieldname
						+ '-'
						+ datetimestamp
						+ '.'
						+ file.originalname.split('.')[file.originalname
								.split('.').length - 1])
	}
});
var upload = multer(
		{ // multer settings
			storage : storage,
			fileFilter : function(req, file, callback) { // file filter
				if ([ 'xls', 'xlsx' ]
						.indexOf(file.originalname.split('.')[file.originalname
								.split('.').length - 1]) === -1) {
					return callback(new Error('Wrong extension type'));
				}
				callback(null, true);
			}
		}).single('file');
/** API path that will upload the files */
exports.importToJSON = function(req, res) {
	var exceltojson;
	upload(req, res,
			function(err) {
				if (err) {
					res.json({
						error_code : 1,
						err_desc : err
					});
					return;
				}
				/** Multer gives us file info in req.file object */
				if (!req.file) {
					res.json({
						error_code : 1,
						err_desc : "No file passed"
					});
					return;
				}
				/**
				 * Check the extension of the incoming file and use the
				 * appropriate module
				 */
				if (req.file.originalname.split('.')[req.file.originalname
						.split('.').length - 1] === 'xlsx') {
					exceltojson = xlsxtojson;
				} else {
					exceltojson = xlstojson;
				}
				try {
					exceltojson({
						input : req.file.path,
						output : null, // since we don't need output.json
						lowerCaseHeaders : false
					}, function(err, result) {
						if (err) {
							return res.json({
								error_code : 1,
								err_desc : err,
								data : null
							});
						}

						model.insertMany(result, function(error, docs) {
							return res.redirect('/pages/importdata.html');
						});
						/*
						 * res.json({ //error_code : 0, //err_desc : null, data :
						 * result });
						 */

					});
				} catch (e) {
					res.json({
						error_code : 1,
						err_desc : "Corupted excel file"
					});
				}
			})
}
exports.list = function(req, res) {
	var query = model.find({}).sort("EMP_ID");
	query.exec(function(err, results) {
		res.send(results);
	});
};
exports.byTeam = function(req, res) {
	var team = req.body.team;
	var location = req.body.location;
	console.log(team);
	console.log(location);
	var query;
	if (team != null) {
		query = model.find({
			Team : team
		}).sort("EMP_ID");
	} else {
		query = model.find({}).sort("EMP_ID");
	}

	query.exec(function(err, results) {
		res.send(results);
	});
};

exports.getEmpData =function(req, res){
	console.log("inside getEmpData");
	var empName = req.body.empName;
	var query = model.find({
		EMPLOYEE_NAME: empName
	});
	query.exec(function(err, results) {
		res.send(results);
	});
};