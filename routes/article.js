const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');
const Question = require('../models/Question');

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
		const { title, fileFormat, author, tags } = ctx.request.body;
		console.log(title, fileFormat, author, tags);
		const articleCreateRes = await Article.create({
			title: title,
			fileFormat: fileFormat,
			author: author
		})

		let tagIDs = new Array()

		if (tags.length > 0) {
			for (i = 0; i < tags.length; i++) {
				const tagFindResp = await Tag.findOne({ content: tags[i].content })
				//先查一下tag是否存在数据库，若存在更新tag.articles
				if (tagFindResp) {
					tagFindResp.articles.push(articleCreateRes._id)
					let tagUpdateRes = await Tag.updateOne(
						{ content: tags[i].content },
						{
							$set: { articles: tagFindResp.articles }
						}
					)
					console.log("tag已在数据库中=> ",tagUpdateRes)
					tagIDs.push(tagFindResp._id)

				} else {
					//tag不在数据库中，新建一个tag
					let tagCreateRes = await Tag.create({
						content: tags[i].content,
						articles: articleCreateRes._id,
					})
					console.log("tag不再数据库中=> ",tagCreateRes)
					tagIDs.push(tagCreateRes._id)
				}
			}
		}

		console.log('tagsID => ', tagIDs)


		//把tagIDs更新进article.tags
		const articleUpdateRes = await Article.updateOne(
			{ _id: articleCreateRes._id },
			{
				$set: { tags: tagIDs }
			}
		)
		console.log("articleUpdateRes = > ", articleUpdateRes);

		const resp = await Article.findOne({ _id: articleCreateRes._id })
			.populate('author', ['name', 'email'])
			.populate('tags', ['content'])
		// console.log('finalResp => ', resp);

		ctx.response.body = resp;
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
		 * /api/articles/:id:
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
			.populate('tags', ['content'])
			.populate('question')
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
		const { tags, question } = articleFindResp
		console.log('等待更新/删除tags => ', tags)
		console.log('等待更新/删除question => ', question)

		//遍历tags
		if (tags.length > 0) {
			for (i = 0; i < tags.length; i++) {
				let tagFindRes = await Tag.findOne({ _id: tags[i] })
				if (tagFindRes === 0) { console.log("No such tag, err!") }
				let { articles, videos } = tagFindRes
				console.log('当前tag所含articles => ', articles)
				console.log('当前tag所含videos => ', videos)
				//tag存在多个文章id, 把tag.articles中的一个id删除
				if (articles.length > 1) {
					let deleteIndex = articles.indexOf(id)
					articles.splice(deleteIndex, 1)
					let tagUpdateRes = await Tag.updateOne(
						{ _id: tags[i] },
						{
							$set: { articles: articles }
						})
					console.log('保留tag，更新tag.articles => ', tagUpdateRes)
				} else {
					//tag只存在当前的文章id，若videos为空删去tag，若videos不为空保留tag更新tag.articles=[]
					if (videos.length) {
						let tagUpdateRes = await Tag.updateOne(
							{ _id: tags[i] },
							{
								$set: { articles: [] }
							})
						console.log('保留tag，更新tag.articles为[] => ', tagUpdateRes)
					} else {
						let tagDeleteRes = await Tag.deleteOne({ _id: tags[i] })
						console.log('无价值tag,删除 => ', tagDeleteRes)
					}
				}
			}
		}

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
		ctx.body = { 'msg': 'delete success' }
	}
}