const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    creatTime: {
        type: Date,
        default: Date.now
    },
    dob: { //date of birth
        type: Date,
        required: false
    },
    gender: {
        type: String,
        default: 'Unknown',
        enum: ['Male', 'Female', 'Unknown']
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
    // avatar:  {
    //     data: Buffer,
    //     contentType: String
    // },
    articles: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
        required: false
    },
    videos: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
        required: false
    },
    meetings: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
        required: false
    }
});
module.exports = mongoose.model('User', UserSchema);