var companyHoliday = require('../controllers/billingCalendar.server.controller')
module.exports = function(app) {
	app.route('/api/newBillingCalendar')
		.post(companyHoliday.newBillingCalendar);
	app.route('/api/listBillingCalendar')
	.get(companyHoliday.listBillingCalendar);
	
	};