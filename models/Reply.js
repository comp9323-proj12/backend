const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
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
	question: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Question'
	}
    // toWho: {
	// 	type: Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: 'User'
    // }
  });

  module.exports = mongoose.model("Reply",ReplySchema);