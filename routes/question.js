const Question = require("../models/Question");
const Reply = require("../models/Reply");
const { isEmpty } = require("lodash");
module.exports = {
  /**
   * @swagger
   * /meetings/questions/reply
   *  post:
   *    tags:
   *      - "Question"
   *    summary: create a reply of a question
   *    description: Use to create a reply
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  createReply: async (ctx) => {
    const { question } = ctx.request.body;
    const newReply = await Reply.create({
      ...ctx.request.body,
    });
    await Question.updateOne(
      { _id: question },
      { $push: { replies: newReply._id } }
    );
    ctx.response.status = 200;
  },
  /**
   * @swagger
   * /meetings/questions
   *  post:
   *    tags:
   *      - "Question"
   *    summary: create a question
   *    description: Use to create a question
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  createQuestion: async (ctx) => {
    const { whichArticle, whichVideo } = ctx.request.body;
    await Question.create({
      ...ctx.request.body,
    });
    const data = !isEmpty(whichArticle)
      ? await Question.find({ whichArticle })
          .populate({
            path: "replies",
            populate: { path: "whoPost", select: "name" },
          })
          .populate("whoPost", ["name"])
          .sort("-createTime")
      : await Question.find({ whichVideo })
          .populate({
            path: "replies",
            populate: { path: "whoPost", select: "name" },
          })
          .populate("whoPost", ["name"])
          .sort("-createTime");
    ctx.body = data;
    ctx.response.status = 200;
  },

  /**
   * @swagger
   * /meetings/article/:id
   *  get:
   *    tags:
   *      - "Question"
   *    summary: get all questions by this article's ID
   *    description: Use to get questions of specific article
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  getQuestionsByArticleId: async (ctx) => {
    const { id } = ctx.request.params;
    const data = await Question.find({ whichArticle: id })
      .populate("whoPost", ["name"])
      .populate({
        path: "replies",
        populate: { path: "whoPost", select: "name" },
      })
      .sort("-createTime");
    ctx.body = data;
    ctx.response.status = 200;
  },

  /**
   * @swagger
   * /meetings/video/:id
   *  get:
   *    tags:
   *      - "Question"
   *    summary: get all questions by this video's ID
   *    description: Use to get questions of specific video
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  getQuestionsByVideoId: async (ctx) => {
    const { id } = ctx.request.params;
    const data = await Question.find({ whichVideo: id })
      .populate("whoPost", ["name"])
      .populate({
        path: "replies",
        populate: { path: "whoPost", select: "name" },
      })
      .sort("-createTime");
    ctx.body = data;
    ctx.response.status = 200;
  },
};
