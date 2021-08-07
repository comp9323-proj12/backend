const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VideoSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	fileFormat: {
		type: String,
		required: false,
		enum: ['mp4', 'mkv', 'avi'] // 这里不一定需要 或许需要在线播放api
	},
	link: {
		type: String,
		required: true,
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
	//TODO: add video schema type(api) recap是啥
	recap: {
		type: String,
		required: false
	},
	description: {
		type: String
	},
	tags: {
		type: [String]
	},
	question: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
		required: false
	},
	like: {
		type: [String]
	},
	category: {
		type: String,
		required: true,
		enum: ['interview', 'others', 'meeting']
	}
});
module.exports = mongoose.model('Video', VideoSchema);