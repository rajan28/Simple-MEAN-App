var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var waterfall = require('async-waterfall');

var options = {
	auth : {
		api_user : 'koyn',
		api_key : 'krzyzewski1'
	}
};

var transporter = nodemailer.createTransport(sgTransport(options));

exports.render = function(req, res) { //Renders information when called

	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	req.session.lastVisit = new Date();

	res.render('index', {
		title: 'Koyn',
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
	    to: 'contact@koyn.io',
	    subject: 'Koyn Mail from ' + data.name,
	    text: data.message
	}, function(err) {
		if (err) {
			console.log(err);
		}
	});

	res.json(data);
};

exports.sendUserWelcomeMail = function(req, res) {

	var data = req.body;

	console.log(data);

	transporter.sendMail({
	    from: 'no-reply@koyn.io',
	    to: data.email,
	    subject: 'Welcome to Koyn',
	    text: 'Hi, welcome to Koyn. Sincerely, The Koyn Team'
	}, function(err) {
		if (err) {
			console.log(err);
		}
	});

	res.json(data);

};