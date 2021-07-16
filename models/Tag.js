const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TagSchema = new Schema({
    content: {
        type: String,
		required: true
    },
    creatTime: {
		type: Date,
		default: Date.now
    },
    articles: {
        type: [{type: Schema.Types.ObjectId, ref: 'Article'}],
		required: false
    },
    videos: {
        type: [{type: Schema.Types.ObjectId, ref: 'Video'}],
		required: false
    }
});
module.exports = mongoose.model('Tag', TagSchema);
