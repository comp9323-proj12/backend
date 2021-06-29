const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
	text: {
		type: String
	},
	// TODO: 新建一个question model,做relationship
	question: {
		type: String
	}
});
module.exports = mongoose.model('Article',ArticleSchema);