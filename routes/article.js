const Article = require('../models/Article');
const User = require('../models/User');
const Question = require('../models/Question');

module.exports = {

	/**
	 * @swagger
	 * /articles:
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
		const { title, author, tags } = ctx.request.body;
		console.log(title, author, tags);
		console.log("ctx.request.body", ctx.request.body);
		await Article.create({
			...ctx.request.body
		});
		ctx.response.status = 200;
	},

	edit: async (ctx) => {
		let { _id } = ctx.request.params;
		console.log("_id", _id);
		let article = await Article.findOne({ _id });
		console.log("articlearticlearticle", ctx.request.body)
		if (!article) {
			ctx.response.status = 404;
		} else {
			await Article.findOneAndUpdate({ _id }, ctx.request.body, {
				new: true,
				runValidators: true,
			})
			ctx.response.status = 200;
		}
	},

	/**
		 * @swagger
		 * /articles/user/${userId}:
		 *  get:
		 *    tags:
		 *      - "Article"
		 *    summary: Return a list of articles by user id
		 *    description: Use to request articles by user Id
		 *    produces:
		 *      - application/json
		 *    responses:
		 *      '200':
		 *        description: OK
		 */
	getArticlesByUser: async (ctx) => {
		const author = ctx.request.params.id;
		console.log("author", author);
		const data = await Article.find({ author }).sort('-createTime');
		ctx.response.status = 200;
		ctx.body = data
	},

	/**
		 * @swagger
		 * /articles:
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
		const data = await Article.find()
		if (data === null) {
			ctx.response.status = 404;
			ctx.body = { 'msg': 'No articles in the database' }
			return
		}
		ctx.response.status = 200;
		ctx.body = data
	},
	/**
	 * @swagger
	 * /articles/:id:
	 *  get:
	 *    tags:
	 *      - "Article"
	 *    summary: Return the specific article 
	 *    description: Use to request the specific article
	 *    produces:
	 *      - application/json
	 *    responses:
	 *      '200':
	 *        description: OK
	 */

	get: async (ctx) => {
		const { id } = ctx.request.params
		const data = await Article.findOne({ _id: id })
			.populate('author', ['name', 'email'])
			.populate({ path: 'question', populate: { path: replies } })
		if (data === null) {
			ctx.response.status = 404;
			ctx.body = { 'msg': 'article not found' }
			return
		}
		ctx.response.status = 200;
		ctx.body = data
	},

	delete: async (ctx) => {
		const { id } = ctx.request.params
		console.log('Id => ', id)
		const articleFindResp = await Article.findOne({ _id: id })
		if (articleFindResp === null) {
			ctx.response.body = { 'msg': 'article not found' }
			ctx.response.status = 404
			return
		}
		const { question } = articleFindResp
		console.log('等待更新/删除question => ', question)

		//question直接删除，不会和tag一样内容重复
		if (question.length > 0) {
			for (i = 0; i < question.length; i++) {
				let questionDeleteRes = await Question.deleteOne({ _id: question[i] })
				console.log('question删除 => ', questionDeleteRes)
			}
		}
		const articleDeleteRes = await Article.deleteOne({ _id: id })
		console.log('article删除 => ', articleDeleteRes)

		ctx.response.status = 200
	}
}