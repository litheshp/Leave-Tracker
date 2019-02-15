module.exports = function (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.user) {
    	
    	res.status(200).send(req.user)
    			       
    }
    // if they aren't redirect them to the login page
    else {
    	//res.sendfile('app/views/index.html');
    	res.status(403).send({
    		errorMessage:'Access Denied.'
    	})
    	//res.redirect('/signout');
    }
};