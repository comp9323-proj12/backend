const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videoTagSchema = new Schema({
    content: {
      type: String,
		  required: true
    },
    creatTime: {
		  type: Date,
		  default: Date.now
    },
    videos: {
      type: [{type: Schema.Types.ObjectId, ref: 'Video'}],
		  required: false
    }
});
module.exports = mongoose.model('videoTag', videoTagSchema);
