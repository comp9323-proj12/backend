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
		enum: ['pdf', 'txt', 'doc', 'docx'], // 这里还需要再改 或许需要在线预览api
		default: 'txt'
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
		type: [String]
	},
	question: {
		type: [{type:Schema.Types.ObjectId, ref: 'Question'}],
		required: false
	},
	like: {
		type: [String]
	}
});
module.exports = mongoose.model('Article',ArticleSchema);