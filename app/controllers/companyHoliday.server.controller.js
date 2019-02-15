var Request = require('mongoose').model('Holiday')
exports.newHoliday = function(req, res) {
	if (!req.FirstName) {
		console.log(req.body);
	var request = new Request(req.body);
	var message = null;
	request.Status = 'Active';
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

exports.listHolidays = function(req, res) {
	var query = Request.find({});
	console.log('inside holidays');
	query.sort({ 'Date' : 1});
	
	 query.exec(function (err, results) {
	 res.send(results);
	 });
}