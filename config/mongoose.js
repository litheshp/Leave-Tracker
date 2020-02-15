var config = require('./config'),
	mongoose = require('mongoose');
	
module.exports = function(){
	var db = mongoose.connect(config.db);
	//console.log(mongoose.connection.readyState);
	mongoose.connection.on('connected', function(){console.log('Connected')});
	mongoose.connection.on('error', function(){console.log('error')});
	mongoose.connection.on('disconnected', function(){console.log('disconnected')});
	
	
	require('../app/models/user.server.model');
	require('../app/models/status.server.model');
	require('../app/models/ideas.server.model');
	return db;
}