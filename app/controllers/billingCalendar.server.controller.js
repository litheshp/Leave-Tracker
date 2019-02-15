var Request = require('mongoose').model('calendar')
exports.newBillingCalendar = function(req, res) {
	if (!req.FirstName) {
		console.log(req.body);
	var request = new Request(req.body);
	var message = null;
	request.save(function(err) {
		if (err) {
			var message = getErrorMessage(err);
			req.flash('error', message);
			return res.redirect('/signup');
		}
	});
	} 
		return res.redirect('/');
};

exports.listBillingCalendar = function(req, res) {
	var query = Request.find({});
	query.sort({ 'order' : 1});
	 query.exec(function (err, results) {
	 res.send(results);
	 });
}