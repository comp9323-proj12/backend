
const Question = require("../models/Question");
const Reply = require("../models/Question");
module.exports = {
	createReply: async (ctx) => {
		const { question } = ctx.request.body;
		console.log("ctx.request.body question", ctx.request.body);
		const newReply = await Reply.create({
			...ctx.request.body
		});
		await Question.updateOne({ _id: question }, { $push: { replies: newReply._id } })
		ctx.response.status = 200;
	},
	createQuestion: async (ctx) =>{
		await Question.create({
			...ctx.request.body
		});
		ctx.response.status = 200
	}
}