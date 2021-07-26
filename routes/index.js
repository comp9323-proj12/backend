const router = require("koa-router")();
const article = require("./article");
const meeting = require("./meeting");
const video = require("./video");
const user = require("./user");
const question = require("./question");
const routers = router

  // Article
  .get('/articles', article.list)
  .get('/articles/:id', article.get)
  .patch('/articles/:_id', article.edit)
  .get('/articles/user/:id', article.getArticlesByUser)
  .post('/articles', article.create)
  .delete('/articles/delete/:id', article.delete)

  //Meeting
  .get("/meetings", meeting.list)
  .post("/meetings", meeting.create)
  .post("/meetings/enroll/:_id", meeting.enroll)
  .delete("/meetings/:_id", meeting.delete)
  .patch("/meetings/:_id", meeting.edit)
  .get("/meetings/findByName/:name", meeting.searchByName)
  .get("/meetings/getlist/:userID", meeting.getList)
  .get("/meetings/getpostlist/:userID", meeting.getPostList)
  .get('/meetings/user/:id', meeting.getMeetingsByUser)

  //Video
  .post('/videos', video.create)
  .patch('/videos/:_id', video.edit)
  .get('/videos/user/:id', video.getVideosByUser)
  .delete("/videos/delete/:id", meeting.delete)
  //User
  .post('/users/login', user.login)
  .post('/users/register', user.register)
  .get('/users/researchers', user.getResearchers)
  // Question
  .post('/question/reply', question.createReply)
  .post('/question', question.createQuestion)
module.exports = routers;
