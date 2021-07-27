const Koa = require("koa");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const app = new Koa();
const routers = require("./routes");
const config = require("./config");

app.use(cors());
app.use(bodyParser());
mongoose.Promise = global.Promise;
mongoose
  .connect(config.database)
  .then(console.log("connect to the mongodb successfully"));
app.use(routers.routes());
app.listen(4000);
console.log("API server is on port 4000");
