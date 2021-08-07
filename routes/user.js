const User = require("../models/User");
const { isEmpty } = require("lodash");

module.exports = {
  /**
   * @swagger
   * /user/login
   *  post:
   *    tags:
   *      - "User"
   *    summary: user login
   *    description: Use to login
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  login: async (ctx) => {
    const { email, password } = ctx.request.body;
    const currentUser = await User.findOne({ email, password });
    ctx.response.body = currentUser ? currentUser : {};
    ctx.response.status = 200;
  },

  /**
   * @swagger
   * /user/register
   *  post:
   *    tags:
   *      - "User"
   *    summary: users register
   *    description: Use to register
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  register: async (ctx) => {
    const { body } = ctx.request;
    const { email } = body;
    const user = await User.findOne({ email });
    if (!isEmpty(user)) {
      ctx.response.body = {
        registerFlag: false,
      };
    } else {
      const newUser = new User(body);
      newUser.save();
      ctx.response.body = {
        registerFlag: true,
      };
    }
    ctx.response.status = 200;
  },

  /**
   * @swagger
   * /user/researchers
   *  get:
   *    tags:
   *      - "User"
   *    summary: get all the researchers
   *    description: Use to get researchers
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *        description: OK
   */
  getResearchers: async (ctx) => {
    const result = await User.find({
      // $or : [
      // 	{ $where: "this.articles.length > 0" },
      // 	{ $where: "this.videos.length > 0" },
      // 	{ $where: "this.meetings.length > 0" }
      // ]
    });
    const sortedResult = result.sort(function (a, b) {
      return (
        b.articles.length +
        b.videos.length +
        b.meetings.length -
        (a.articles.length + a.videos.length + a.meetings.length)
      );
    });

    ctx.response.status = 200;
    ctx.response.body = { researchers: sortedResult };
  },
};
