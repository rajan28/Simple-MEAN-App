var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
	auth : {
		api_user : 'koyn',
		api_key : 'krzyzewski1'
	}
};

var transporter = nodemailer.createTransport(sgTransport(options));

// var transporter = nodemailer.createTransport({
//     service: 'Yahoo',
//     auth: {
//         user: 'rajan2894@yahoo.com',
//         pass: 'fl0ating'
//     }
// });

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
	    to: 'admin@koyn.io',
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

};

exports.sendPasswordResetMail = function(req, res) {

	var data = req.body;

	console.log(data);

	transporter.sendMail({
	    from: 'rajan2894@yahoo.com',
	    to: data.email,
	    subject: 'Koyn Password Reset',
	    text: 'You lost your password. For shame. You will never get another. Warm Regards, The Koyn Team'
	}, function(err) {
		if (err) {
			console.log(err);
		}
	});

	res.json(data);
};