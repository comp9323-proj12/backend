const Koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();
const routers = require('./routes');
const config = require('./config');

app.use(cors());
app.use(bodyParser());
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.use(routers.routes());
app.listen(process.env.PORT || 4000, () => {
  console.log(`sever has successfully run on port ${process.env.PORT}`);
});