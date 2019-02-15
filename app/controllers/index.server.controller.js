exports.render = function(req,res){

	if(req.user) {
		    res.redirect('/pages/index.html');
		}
		else {

			res.sendFile(__dirname+'/views/index.html');
		}
};
