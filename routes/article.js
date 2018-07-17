var express = require("express")
var router = express.Router()
var Article = require("../models/article")

//统一返回格式用 router.use
var responseData
router.use( function(req, res, next){
	responseData = {
		code: 0,
		message: ""
	}
	next()
})

// vue数据提交
router.post("/add", function(req, res, next) {
	var title = req.body.title
	var content = req.body.content
	// //添加记录
	var article = new Article({
		title: title,
		content: content
	})
	article.save().then(function(info){
		responseData.message = "提交成功！"
		res.json(responseData)
	})
})

//vue文章列表
router.get("/list", function(req, res, next) {
	Article.find().then(function(articles){
		res.json(articles)
	})
})
// vue 删除数据
router.post("/del", function(req, res, next) {
	var id = req.body.id
	Article.findByIdAndRemove(id).then(function(article){
		res.json(article)
	})
})
module.exports = router
