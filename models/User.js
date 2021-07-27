const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  creatTime: {
    type: Date,
    default: Date.now,
  },
  dob: {
    //date of birth
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    default: "Unknown",
    enum: ["Male", "Female", "Unknown"],
  },
  country: {
    type: String,
    required: false,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  researchArea: {
    type: [String],
    required: false,
  },
  publications: {
    type: [String],
    required: false,
  },
  biography: {
    type: String,
    required: false,
  },
  career: {
    type: String,
    required: false,
  },
  //TODO: add photo schema type
  articles: {
    type: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    required: false,
  },
  videos: {
    type: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    required: false,
  },
  meetings: {
    type: [{ type: Schema.Types.ObjectId, ref: "Meeting" }],
    required: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, hash) {
  let res = bcrypt.compareSync(password, hash);
  return res;
};
module.exports = mongoose.model("User", UserSchema);
