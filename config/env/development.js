module.exports = {
	//Development configuration options
	db : 'mongodb://localhost:27017/mean-book',
	sessionSecret : 'devSessionSecret',
	facebook : {
		clientID : '1582944231965493',
		clientSecret : '14545a169a4f2ae33a5f2d485fbdb38e',
		callbackURL : 'http://localhost:8000/oauth/facebook/callback'
	}
};