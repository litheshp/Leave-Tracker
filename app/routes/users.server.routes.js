var users = require('../controllers/users.server.controller'),
	passport = require('passport');
//console.log(users)
module.exports = function(app) {
	app.route('/signup').get(users.renderSignup).post(users.signup);
	app.route('/signin').get(users.renderSignin).post(
			
			passport.authenticate('local', 			
					{
				successRedirect : '/pages/index.html',
				failureRedirect : '/',
				failureFlash : true
			}));
	/*app.route('/signin').get(users.renderSignin).post(function(req, res, next) {
		  passport.authenticate('local', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { return res.redirect('/signin'); }
		    req.logIn(user, function(err) {
		      if (err) { return next(err); }
		      return res.redirect('/pages/index.html?name=' + req.user.firstName);
		    });
		  })(req, res, next);
		});*/
	
	app.get('/signout', users.signout);
};