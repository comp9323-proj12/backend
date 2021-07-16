const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MeetingSchema = new Schema({
    hosts: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}],
		required: true,
    },
    title: {
        type: String,
		required: true
    },
    link: {
        type: String,
		required: true
    },
    notice: {  //发布类似简短的公告
        type: String,
		required: true
    },
    startTime: {
        type: Date,
		required: true
    },
    creatTime: {
        type: Date,
		default: Date.now
    }
});
module.exports = mongoose.model('Meeting', MeetingSchema);