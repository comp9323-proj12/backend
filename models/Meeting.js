const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MeetingSchema = new Schema({
  instructor: {
    //主讲人
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  like: {
		type: [String]
	},
  link: {
    type: String,
    required: true,
  },
  description: {
    //发布类似简短的公告
    type: String,
  },
  startTime: {
    type: Date, //数据类型改变
    required: true,
  },
  creatTime: {
    type: Date,
    default: Date.now,
  },
  students: {
    //参与会议人员
    type: [String],
    default: [],
  },
  tags: {
    type: [String]
  },
  category: {
		type: String,
		required: true,
		enum: ['QA', 'presentation', 'others']
	}
});
module.exports = mongoose.model("Meeting", MeetingSchema);
