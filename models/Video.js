const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VideoSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	fileFormat: {
		type: String,
		required: true,
		enum: ['mp4', 'mkv', 'avi'] // 这里不一定需要 或许需要在线播放api
	},
	author: {
        type: Schema.Types.ObjectId,
		required: false,
		ref: 'User'
	},
	createTime: {
		type: Date,
		default: Date.now
	},
    //TODO: add video schema type(api)
    recap:{
        type: String,
		required: false
    },
	tags: {
		type: [{type:Schema.Types.ObjectId, ref: 'Tag'}],
		required: false
	},
	question: {
		type: [{type:Schema.Types.ObjectId, ref: 'Question'}],
		required: false
	}
});
module.exports = mongoose.model('Video', VideoSchema);