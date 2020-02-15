const users = require('../controllers/users.server.controller');	
const passport = require('passport');
//console.log(users)
module.exports = function(app) {
	app.route('/signup').get(users.renderSignup).post(users.signup);
	app.route('/signin').get(users.renderSignin).post(
			
			passport.authenticate('local', 			
					{
				successRedirect : '/pages/AllData.html',
				failureRedirect : '/',
				failureFlash : true
			}));
	
	app.get('/signout', users.signout);
};