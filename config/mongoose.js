var config = require('./config'),
	mongoose = require('mongoose');
	
module.exports = function(){
	var db = mongoose.connect(config.db);
	console.log(mongoose.connection.readyState);
	mongoose.connection.on('connected', function(){console.log('Connected')});
	mongoose.connection.on('error', function(){console.log('error')});
	mongoose.connection.on('disconnected', function(){console.log('disconnected')});
	require('../app/models/request.server.model');
	require('../app/models/companyHoliday.server.model');
	require('../app/models/data.server.model');
	require("../app/models/configDoc.server.model.js");
	require("../app/models/importData.server.model.js");
	require("../app/models/employees.server.model.js");
	require("../app/models/BillingCalendar.server.model.js");
	require("../app/models/weeklydata.server.model.js");    
	require('../app/models/user.server.model');
	require('../app/models/lookupvalues.server.model.js');
	
	
	
	return db;
}