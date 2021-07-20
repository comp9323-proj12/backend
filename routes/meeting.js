const Meeting = require("../models/Meeting");

module.exports = {
  //create a new meeting
  create: async (ctx) => {
    const { title, link, notice, startTime, currentID } = ctx.request.body;
    // const { text } = ctx.request.body;
    const meeting = new Meeting({
      title,
      link,
      notice,
      startTime,
      instructor: currentID,
    });
    await meeting.save();
    // ctx.body = article;
    ctx.response.status = 200;
  },

  //delete a meeting
  delete: async (ctx) => {
    let { _id } = ctx.request.params;
    let meeting = await Meeting.findOne({ _id });
    if (!meeting) {
      ctx.response.status = 404;
    } else {
      await Meeting.deleteOne({ _id })
        .then(() => {
          ctx.body = {
            message: "Delete Successfully",
          };
        })
        .catch((err) => {
          ctx.body = err;
        });
    }
  },

  //edit meeting details
  edit: async (ctx) => {
    let { _id } = ctx.request.params;
    console.log(_id);
    let meeting = await Meeting.findOne({ _id });
    if (!meeting) {
      ctx.response.status = 404;
    } else {
      const newBody = ({ title, link, notice, startTime, instructor } =
        ctx.request.body);
      await Meeting.findOneAndUpdate({ _id }, newBody, {
        new: true,
        runValidators: true,
      })
        .then(() => {
          ctx.body = {
            message: "Updata Successfully",
          };
        })
        .catch((err) => {
          ctx.body = err;
        });
    }
  },

  list: async (ctx) => {
    const data = await Meeting.find();
    ctx.response.status = 200;
    ctx.body = data;
  },
  // search the meetings
  searchByName: async (ctx) => {
    const { name } = ctx.request.params;
    const data = await Meeting.find({ title: name });
    ctx.body = data;
  },
  searchById: async (ctx) => {
    const { _id } = ctx.request.params;
    const data = await Meeting.find({ _id });
    ctx.body = data;
  },
  //enroll a meeting
  enroll: async (ctx) => {
    let { _id } = ctx.request.params;
    let { currentID } = ctx.request.body;
    console.log(_id);
    let meeting = await Meeting.findOne({ _id });
    if (!meeting) {
      ctx.response.status = 404;
    } else {
      meeting.students.push(currentID);
      await meeting.save();
      ctx.body = {
        message: "Enrolled successfully",
      };
    }
  },
  //get all meetings registered by this student
  getList: async (ctx) => {
    let { userID } = ctx.request.params;
    console.log("coming to getList try part");
    console.log(userID);
    const data = await Meeting.find({ students: userID }).populate(
      "instructor",
      ["name"]
    );
    ctx.response.status = 200;
    ctx.body = data;
    console.log("finalResp => ", data);
  },

  //get all meetings posted by this student
  getPostList: async (ctx) => {
    let { userID } = ctx.request.params;
    console.log("coming to getPostList");
    const data = await Meeting.find({ instructor: userID });
    console.log("final postlist data =>", data);
    ctx.response.status = 200;
    ctx.body = data;
  },
};
