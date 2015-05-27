module.exports = {
	//Production configuration options
	sessionSecret : 'productionSessionSecret',
	db : process.env.MONGOLAB_URI
};