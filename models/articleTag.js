const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleTagSchema = new Schema({
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
    }
});
module.exports = mongoose.model('articleTag', articleTagSchema);
