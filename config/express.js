//3P Modules
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
//var passport = require('passport');

//My Modules
var config = require('./config.js');

//exports the express instance 
module.exports = function() {

	//initializes an express app
	var app = express();

	//applies middleware functions to the app
	//executed in order
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev')); //logger
	};
	if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	};
	app.use(bodyParser.urlencoded( {
		extended : true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session( {
		secret : config.sessionSecret,
		saveUninitialized : true,
		resave : true
	})); //Adds a session object to all requests in app, to keep track of users' behavior

	//Specifies the location of the views
	app.set('views', './app/views');
	//Tells the view engine to look for EJS Templates
	app.set('view engine', 'ejs');

	//app.use(passport.initialize());
	//app.use(passport.session());
	
	//Applies the routes to the app
	require('../app/routes/index.s.route.js')(app);
	require('../app/routes/user.s.route.js')(app);

	//Specifies the location of static files
	//Serves the static files after rendering the dynamic content...
	//...to avoid extra filesystem I/O calls
	app.use(express.static('./public'));

	return app;
};