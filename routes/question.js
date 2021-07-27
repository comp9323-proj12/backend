
const Question = require("../models/Question");
const Reply = require("../models/Reply");
const { isEmpty } = require('lodash');
module.exports = {
	createReply: async (ctx) => {
		const { question } = ctx.request.body;
		console.log("ctx.request.body question", ctx.request.body);
		const newReply = await Reply.create({
			...ctx.request.body
		});
		console.log('newReplu', newReply)
		await Question.updateOne({ _id: question }, { $push: { replies: newReply._id } })
		ctx.response.status = 200;
	},
	createQuestion: async (ctx) => {
		const { whichArticle } = ctx.request.body;
		await Question.create({
			...ctx.request.body
		});
		const data = !isEmpty(whichArticle) ?
			await Question.find({ whichArticle })
				.populate({ path: 'replies', populate: { path: 'whoPost', select: 'name' } })
				.populate('whoPost', ['name'])
				.sort('-createTime')
			: await Question.find({ whichVideo })
				.populate({ path: 'replies', populate: { path: 'whoPost', select: 'name' } })
				.populate('whoPost', ['name'])
				.sort('-createTime')
		ctx.body = data
		ctx.response.status = 200
	},
	getQuestionsByArticleId: async (ctx) => {
		const { id } = ctx.request.params;
		const data = await Question.find({ whichArticle: id }).populate('whoPost', ['name'])
			.populate({ path: 'replies', populate: { path: 'whoPost', select: 'name' } }).sort('-createTime')
		ctx.body = data
		ctx.response.status = 200
	},
	getQuestionsByVideoId: async (ctx) => {
		const { id } = ctx.request.params;
		const data = await Question.find({ whichVideo: id }).populate('whoPost', ['name'])
			.populate({ path: 'replies', populate: { path: 'whoPost', select: 'name' } }).sort('-createTime')
		ctx.body = data
		ctx.response.status = 200
	},
}