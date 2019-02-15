var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport');

module.exports = function(){
	var app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
		}));
	
	
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
	
	
	
	/*
	 * app.use(session({ saveUninitialized :true, resave: true, secret:
	 * config.sessionSecret, }));
	 */
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/requests.server.routes.js')(app);
	require('../app/routes/companyHoliday.server.routes.js')(app);
	require('../app/routes/excelImport.server.routes.js')(app);
	require('../app/routes/billingCalendar.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	app.use(express.static('./public'));
	return app;
}