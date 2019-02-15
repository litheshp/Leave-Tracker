var companyHoliday = require('../controllers/companyHoliday.server.controller')
module.exports = function(app) {
	app.route('/api/newHoliday')
		.post(companyHoliday.newHoliday);
	app.route('/api/holidays')
	.get(companyHoliday.listHolidays);
	
	
	
	};