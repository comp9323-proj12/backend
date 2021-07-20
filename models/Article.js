const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	fileFormat: {
		type: String,
		required: true,
		enum: ['pdf', 'txt', 'doc', 'docx'] // 这里还需要再改 或许需要在线预览api
	},
	text: {
		type: String,
		required: false
	},
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	createTime: {
		type: Date,
		default: Date.now
	},
	tags: {
		type: [{type:Schema.Types.ObjectId, ref: 'articleTag'}],
		required: false
	},
	question: {
		type: [{type:Schema.Types.ObjectId, ref: 'Question'}],
		required: false
	}
});
module.exports = mongoose.model('Article',ArticleSchema);