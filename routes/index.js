const router = require("koa-router")();
const article = require("./article");
const meeting = require("./meeting");
const video = require("./video");
const user = require("./user");
const question = require("./question");
const routers = router
  // Landing page
  .get('/articles', ()=>console.log("Backend deployed on Heroku, MongoDB deployed on Atlas."))

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
  .get('/videos', video.list)
  .delete("/videos/delete/:id", video.delete)
  //User
  .post('/users/login', user.login)
  .post('/users/register', user.register)
  .get('/users/researchers', user.getResearchers)
  // Question
  .post('/questions/reply', question.createReply)
  .post('/questions', question.createQuestion)
  .get('/questions/article/:id', question.getQuestionsByArticleId)
  .get('/questions/video/:id', question.getQuestionsByVideoId)

module.exports = routers;
