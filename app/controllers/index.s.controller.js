exports.render = function(req, res) { //Renders information when called

	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	req.session.lastVisit = new Date();

	res.render('index', {
		title: 'Flamingo',
		user : JSON.stringify(req.user),
		provider : req.user ? req.user.provider : ''
	});
};