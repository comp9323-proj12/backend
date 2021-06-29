const Article = require('../models/Article');

module.exports = {

	/**
	 * @swagger
	 * /api/articles:
	 *  post:
	 *    tags:
	 *      - "Article"
	 *    summary: Create a new article
	 *    description: Use to create a new article
	 *    consumes:
	 *      - application/json
	 *    parameters:
	 *      - in: body
	 *        name: assignment
	 *        description: The article to create
	 *    responses:
	 *      '200':
	 *        description: OK
	 */

	create: async (ctx) => {
		const data = ctx.request.body;
		// const { text } = ctx.request.body;
		const article = new Article(data);
		await article.save();
		// ctx.body = article;
		ctx.response.status = 200;
	},

	/**
		 * @swagger
		 * /api/articles:
		 *  get:
		 *    tags:
		 *      - "Article"
		 *    summary: Return a list of articles
		 *    description: Use to request all articles
		 *    produces:
		 *      - application/json
		 *    responses:
		 *      '200':
		 *        description: OK
		 */

	list: async (ctx) => {
		const data = await Article.find();
		ctx.response.status = 200;
		ctx.body = data
	}
}