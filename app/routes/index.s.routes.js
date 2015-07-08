module.exports = function(app) {
	//Specifies which route to render, based on the path...
	//...and request type that is made to the server
	var index = require('../controllers/index.s.controller.js');
	
	app.route('/')
		.get(index.render)
		.post(index.render)
		.put(index.render)
		.delete(index.render);

	app.route('/contact')
		.post(index.sendMail);

	app.route('/passwordreset')
		.post(index.sendPasswordResetMail);

	app.route('/welcome')
		.post(index.sendUserWelcomeMail);
};