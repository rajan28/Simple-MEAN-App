process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 8000;

var mongoose = require('./config/mongoose.js');
var express = require('./config/express.js');
var passport = require('./config/passport.js');

//Connects MongoDB to application, as specified in config/mongoose
var db = mongoose();

//App on server after all middleware and rendering has finished
var app = express();

var passport = passport();

console.log('Server running');
app.listen(process.env.PORT);
console.log(process.env.PORT);
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

module.exports = app;
