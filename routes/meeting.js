const Meeting = require("../models/Meeting");

module.exports = {
  //create a new meeting
  create: async (ctx) => {
    // const { text } = ctx.request.body;
    const meeting = new Meeting({
      ...ctx.request.body
    });
    await meeting.save();
    // ctx.body = article;
    ctx.response.status = 200;
  },
  /**
     * @swagger
     * /meetings/user/${instructorId}:
     *  get:
     *    tags:
     *      - "Article"
     *    summary: Return a list of meetings by instructor id
     *    description: Use to request articles by user Id
     *    produces:
     *      - application/json
     *    responses:
     *      '200':
     *        description: OK
     */
  getMeetingsByUser: async (ctx) => {
    const instructor = ctx.request.params.id;
    const data = await Meeting.find({ instructor }).sort('-createTime');
    ctx.response.status = 200;
    ctx.body = data;
  },

  //delete a meeting
  delete: async (ctx) => {
    let { _id } = ctx.request.params;
    let meeting = await Meeting.findOne({ _id });
    if (!meeting) {
      ctx.response.status = 404;
    } else {
      await Meeting.deleteOne({ _id })
      ctx.response.status = 200
    }
  },

  //edit meeting details
  edit: async (ctx) => {
    let { _id } = ctx.request.params;
    let meeting = await Meeting.findOne({ _id });
    if (!meeting) {
      ctx.response.status = 404;
    } else {
      const newBody = ctx.request.body;
      const data = await Meeting.findOneAndUpdate({ _id }, newBody, {
        new: true,
        runValidators: true,
      })
      ctx.response.status = 200;
    }
  },

  list: async (ctx) => {
    const { subCategory, value } = ctx.request.query;
    let data = [];
    if (subCategory == 'title') {
      data = await Meeting.find({ title: new RegExp(value) })
        .populate('instructor')
    }
    else if (subCategory === "tag") {
      data = await Meeting.find({ tags: new RegExp(value) })
        .populate('instructor')
    }
    ctx.response.status = 200;
    if (!data) {
      ctx.body = []
    }
    else {
      ctx.body = data
    }
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
  //get all meetings registered by this student
  getList: async (ctx) => {
    let { userID } = ctx.request.params;
    const data = await Meeting.find({ students: userID }).populate(
      "instructor",
      ["name"]
    );
    ctx.response.status = 200;
    ctx.body = data;
  },

  //get all meetings posted by this student
  getPostList: async (ctx) => {
    let { userID } = ctx.request.params;
    const data = await Meeting.find({ instructor: userID });
    ctx.response.status = 200;
    ctx.body = data;
  },
};
