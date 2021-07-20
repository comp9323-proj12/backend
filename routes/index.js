const router = require("koa-router")();
const article = require("./article");
const meeting = require("./meeting");
const routers = router

  // Article
  .get("/articles", article.list)
  .post("/articles", article.create)

  //Meeting
  .get("/meetings", meeting.list)
  .post("/meetings", meeting.create)
  .post("/meetings/enroll/:_id", meeting.enroll)
  .delete("/meetings/:_id", meeting.delete)
  .patch("/meetings/:_id", meeting.edit)
  .get("/meetings/findByName/:name", meeting.searchByName)
  .get("/meetings/getlist/:userID", meeting.getList)
  .get("/meetings/getpostlist/:userID", meeting.getPostList);
// 基本款CRUD的命名：create, delete,update, list拿所有/get根据id拿单个
module.exports = routers;
