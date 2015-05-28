process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose.js');
var express = require('./config/express.js');
var passport = require('./config/passport.js');

//Connects MongoDB to application, as specified in config/mongoose
var db = mongoose();

//App on server after all middleware and rendering has finished
var app = express();

var passport = passport();

app.set('port', (process.env.PORT || 8000));

console.log('Server running');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;

