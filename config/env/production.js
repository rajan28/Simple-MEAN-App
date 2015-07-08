module.exports = {
	//Production configuration options
	mainURL : 'http://koyn.io',
	sessionSecret : 'productionSessionSecret',
	db : process.env.MONGOLAB_URI,
	facebook : {
		clientID : '1600026713616768',
		clientSecret : 'b92c76f225ee6bac730750ffcb60bbc0',
		callbackURL : 'https://thawing-garden-5169.herokuapp.com/oauth/facebook/callback'
	}
};