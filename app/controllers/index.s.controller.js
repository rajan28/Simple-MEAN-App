var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
        user: 'rajan2894@yahoo.com',
        pass: 'fl0ating'
    }
});

exports.render = function(req, res) { //Renders information when called

	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	req.session.lastVisit = new Date();

	res.render('index', {
		title: 'Flamingo',
		local: req.ip,
		user : JSON.stringify(req.user),
		provider : req.user ? req.user.provider : ''
	});
};

exports.sendMail = function(req, res) {

	var data = req.body;

	console.log(data);

	transporter.sendMail({
	    from: data.email,
	    to: 'rajan.patel28@gmail.com',
	    subject: 'Flamingo Mail from ' + data.name,
	    text: data.message
	}, function(err) {
		if (err) {
			console.log(err);
		}
	});

	res.json(data);
};