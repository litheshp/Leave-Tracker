module.exports = function(app){
	var index = require('../../app/controllers/index.server.controller.js');
	app.get('/',index.render);
	app.get('/pages/',index.render);
}
