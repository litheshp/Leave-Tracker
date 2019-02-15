process.env.NODE_ENV = 'development'
var mangoose = require('./config/mongoose'), 
express = require('./config/express'),
passport = require('./config/passport');
var db = mangoose();
var app = express();
var passport = passport();
console.log(db);
//cfenv provides access to your Cloud Foundry environment
//for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
//get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
//app.listen(3000);
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});
module.exports = app;
//console.log("Server is running at http://localhost:3000/");