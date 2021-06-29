const router = require('koa-router')();
const article = require('./article');

const routers = router
	// Article
	.get('/articles', article.list)
	.post('/articles', article.create)

// 基本款CRUD的命名：create, delete,update, list拿所有/get根据id拿单个
module.exports = routers;
