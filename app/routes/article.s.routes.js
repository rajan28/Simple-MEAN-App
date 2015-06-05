var user = require('../../app/controllers/user.s.controller.js');
var article = require('../../app/controllers/article.s.controller.js');

module.exports = function(app) {
	app.route('/api/articles')
		.get(article.list)
		.post(user.requiresLogin, article.create);

	app.route('/api/articles/:articleId')
		.get(article.read)
		.put(user.requiresLogin, article.hasAuthorization, article.update)
		.delete(user.requiresLogin, article.hasAuthorization, article.delete);

	app.param('articleId', article.articleByID);
};