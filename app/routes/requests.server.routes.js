var requests = require('../controllers/requests.server.controller');
var data = require('../controllers/data.server.controller');
var authentictaion =require('../controllers/users.server.controller.js');

module.exports = function(app) {
	app.route('/api/new')
	.post(requests.newRequest);
	
	app.route('/api/newConfig')
	.post(data.newConfig);
	
	app.route('/api/config')
	.get(data.list);
	
	app.route('/api/requests')
	.get(requests.list);
	
	
	
	app.route('/api/data')
	.post(requests.data);
	
	app.route('/api/datalist')
	.get(requests.getData);
	
	app.route('/api/areachart')
	.get(data.getData);
	app.route('/signout')
	.get(authentictaion.signout);
	
	
	app.route('/api/datalist')
	.post(requests.getData);
	
	};
	
	
	


	