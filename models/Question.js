const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
    text:{
    	type:String,
    	required:true
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
    // toWho: {
	// 	type: Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: 'User'
    // }
  });
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
		type: [replySchema],
		required: false
	}

});
module.exports = mongoose.model('Reply', replySchema);
module.exports = mongoose.model('Question', QuestionSchema);