exports.render = function(req, res) { //Renders information when called

	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	req.session.lastVisit = new Date();

	res.render('index', {
		title: 'Flamingo',
		userFullName : req.user ? req.user.fullName : '',
		provider : req.user ? req.user.provider : '',
		fbName : req.user ? ((req.user.provider == 'facebook') ? req.user.providerData.name : '') : ''
	});
};