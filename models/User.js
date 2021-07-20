const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    creatTime: {
		type: Date,
		default: Date.now
    },
    dob: { //date of birth
        type: Date,
        required: false
    },
    gender:  {
        type: String,
        default: 'Unkown',
        enum: ['Male','Female','Unkown']
    },
    country: {
        type: String,
        required: false
    },
    contactNumber: {
        type: String,
        required: false
    },
    researchArea: {
        type: [String],
        required: false
    },
    publications: {
        type: [String],
        required: false
    },
    biography: {
        type: String,
        required: false
    },
    career: {
        type: String,
        required: false
    },
    //TODO: add photo schema type
    article: {
        type: [{type:Schema.Types.ObjectId, ref: 'Article'}],
        required: false
    },
    video: {
        type: [{type:Schema.Types.ObjectId, ref: 'Video'}],
        required: false
    },
    meeting: {
        type: [{type:Schema.Types.ObjectId, ref: 'Meeting'}],
        required: false
    }
});
module.exports = mongoose.model('User', UserSchema);