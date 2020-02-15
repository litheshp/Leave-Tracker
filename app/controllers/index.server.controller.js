exports.render = function(req,res){

	if(req.user) {
		    res.redirect('/pages/AllData.html');
		}
		else {
			res.redirect('/views/login.html');	
			//res.sendFile('/views/index.html');
		}
};
