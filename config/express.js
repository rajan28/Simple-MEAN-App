//3P Modules
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var socketio = require('socket.io');
var MongoStore = require('connect-mongo')(session);

//Node Core Modules
var http = require('http');

//My Modules
var config = require('./config.js');

//exports the express instance 
module.exports = function() {

	//initializes an express app
	var app = express();

	//adds socketio functionality
	var server = http.createServer(app);
	var io = socketio.listen(server);

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

	var mongoStore = new MongoStore( {
		mongooseConnection : mongoose.connection
	});

	app.use(session( {
		secret : config.sessionSecret,
		saveUninitialized : true,
		resave : true,
		store : mongoStore
	})); //Adds a session object to all requests in app, to keep track of users' behavior

	//Specifies the location of the views
	app.set('views', './app/views');
	//app.set('views', './public/views');
	//Tells the view engine to look for EJS Templates
	app.set('view engine', 'ejs');

	app.use(favicon('favicon.ico'));

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(function(req, res, next) {
    	res.setHeader("id", req.user ? req.user._id : '');
    	return next();
  	});
	
	//Applies the routes to the app
	require('../app/routes/index.s.routes.js')(app);
	require('../app/routes/user.s.routes.js')(app);
	require('../app/routes/article.s.routes.js')(app);
	require('../app/routes/restaurant.s.routes.js')(app);
	require('../app/routes/bar.s.routes.js')(app);
	require('../app/routes/club.s.routes.js')(app);

	//Specifies the location of static files
	//Serves the static files after rendering the dynamic content...
	//...to avoid extra filesystem I/O calls
	app.use(express.static('./public'));

	require('./socketio')(server, io, mongoStore);

	return server;
};