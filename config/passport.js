var passport = require('passport'), mongoose = require('mongoose');
module.exports = function() {
	var User = mongoose.model('User');
	passport.serializeUser(function(user, done) {
		console.log(user);
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id : id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});
	//console.log(require('./strategies/local.js')())
	require('./strategies/local.js')();
	// require('./strategies/facebook.js')();
};