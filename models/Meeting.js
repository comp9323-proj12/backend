const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MeetingSchema = new Schema({
  instructor: {
    //instructor
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  like: {
    type: [String],
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    //post short notice
    type: String,
  },
  startTime: {
    type: Date, //change the data type from string to data
    required: true,
  },
  creatTime: {
    type: Date,
    default: Date.now,
  },
  students: {
    //people who enrolled this meeting
    type: [String],
    default: [],
  },
  tags: {
    type: [String],
  },
  category: {
    type: String,
    required: true,
    enum: ["QA", "presentation", "others"],
  },
});
module.exports = mongoose.model("Meeting", MeetingSchema);
