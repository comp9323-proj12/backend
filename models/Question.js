const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	whoPost: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	createTime: {
		type: Date,
		default: Date.now
	},
    ifSovled: {
		type: Boolean,
		default: false
	},
    whichArticle: {
        type: Schema.Types.ObjectId,
		required: false,
		ref: 'Article'
    },
    whichVideo: {
        type: Schema.Types.ObjectId,
		required: false,
		ref: 'Video'
    },
    replies: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
		required: false,
	}

});
module.exports = mongoose.model('Question', QuestionSchema);