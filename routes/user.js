const User = require('../models/User');
const { isEmpty } = require('lodash');

module.exports = {
	login: async (ctx) => {
		const { email, password } = ctx.request.body;
		const currentUser = await User.findOne({ email, password })
		ctx.response.body = currentUser ? currentUser : {};
		ctx.response.status = 200;
	},

	register: async (ctx) => {
		const { body } = ctx.request;
		const { email } = body;
		const user = await User.findOne({ email })
		if (!isEmpty(user)) {
			ctx.response.body = {
				registerFlag: false
			};
		}
		else {
			const newUser = new User(body);
			newUser.save();
			ctx.response.body = {
				registerFlag: true
			};
		}
		ctx.response.status = 200;
	},

	getResearchers: async (ctx) => {
		const result = await User
			.find(
			{
				// $or : [
				// 	{ $where: "this.articles.length > 0" },
				// 	{ $where: "this.videos.length > 0" },
				// 	{ $where: "this.meetings.length > 0" }
				// ]
			}			
			)
		const sortedResult = result.sort(function(a, b){
			return (b.articles.length+b.videos.length+b.meetings.length)-(a.articles.length+a.videos.length+a.meetings.length)
		});
		
		ctx.response.status = 200;
		ctx.response.body = {researchers: sortedResult};
	}
};
