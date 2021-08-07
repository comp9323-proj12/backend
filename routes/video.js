const Video = require("../models/Video");

module.exports = {
  /**
   * @swagger
   * /videos:
   *  post:
   *    tags:
   *      - "Video"
   *    summary: Create a new video
   *    description: Use to create a new video
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: body
   *        name: assignment
   *        description: The article to create
   *    responses:
   *      '200':
   *        description: OK
   */

  create: async (ctx) => {
    await Video.create({
      ...ctx.request.body,
    });
    ctx.response.status = 200;
  },

  /**
   * @swagger
   * /videos/ID:
   *  patch:
   *    tags:
   *      - "Video"
   *    summary: edit a video information by ID
   *    description: Use to edit video
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  edit: async (ctx) => {
    let { _id } = ctx.request.params;
    let video = await Video.findOne({ _id });
    if (!video) {
      ctx.response.status = 404;
    } else {
      const newBody = ctx.request.body;
      await Video.findOneAndUpdate({ _id }, newBody, {
        new: true,
        runValidators: true,
      });
    }
    ctx.response.status = 200;
  },

  /**
   * @swagger
   * /videos
   *  get:
   *    tags:
   *      - "Video"
   *    summary: get a video list
   *    description: Use to get video list
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  list: async (ctx) => {
    const { subCategory, value } = ctx.request.query;
    let data = [];
    if (subCategory == "title") {
      data = await Video.find({ title: new RegExp(value) })
        .populate("author")
        .populate({ path: "question", populate: { path: "replies" } });
    } else if (subCategory === "tag") {
      data = await Video.find({ tags: new RegExp(value) })
        .populate("author")
        .populate({ path: "question", populate: { path: "replies" } });
    }
    ctx.response.status = 200;
    if (!data) {
      ctx.body = [];
    } else {
      ctx.body = data;
    }
  },

  /**
   * @swagger
   * /videos/user/${userId}:
   *  get:
   *    tags:
   *      - "Video"
   *    summary: Return a list of videos by user id
   *    description: Use to request videos by user Id
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  getVideosByUser: async (ctx) => {
    const author = ctx.request.params.id;
    const data = await Video.find({ author }).sort("-createTime");
    ctx.response.status = 200;
    ctx.body = data;
  },

  /**
   * @swagger
   * /videos
   *  delete:
   *    tags:
   *      - "Video"
   *    summary: delete a video
   *    description: Use to delete a video
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  delete: async (ctx) => {
    const { id } = ctx.request.params;
    const videoFindResp = await Video.findOne({ _id: id });
    if (videoFindResp === null) {
      ctx.response.body = { msg: "video not found" };
      ctx.response.status = 404;
      return;
    }
    const { question } = videoFindResp;

    //question直接删除，不会和tag一样内容重复
    if (question.length > 0) {
      for (i = 0; i < question.length; i++) {
        let questionDeleteRes = await Question.deleteOne({ _id: question[i] });
      }
    }
    const videoDeleteRes = await Video.deleteOne({ _id: id });

    ctx.response.status = 200;
  },
};
