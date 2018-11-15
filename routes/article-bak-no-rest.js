var express = require("express")
var router = express.Router()
var Article = require("../models/article")
var fs=require("fs")
var path = require("path")

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
		responseData.message = "保存成功！"
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

// vue 修改数据
router.get("/edit", function(req, res, next) {
	var id = req.query.id
	Article.findOne({ _id: id }).then(function(article){
		res.json(article)
	})
})

// vue 查看详情
router.get("/view", function(req, res, next) {
	var id = req.query.id
  //console.log(id);
	// Article.findOne({ _id: id }).then(function(article){
	// 	res.json(article)
	// })
})

// rest api 2018-11-15
router.get("view/:id", function(req, res, next) {
	var id = req.params.id
	console.log(id);
  //res.sendFile(path.resolve('./public/article/view_article.html'));
})

// vue 保存数据
router.post("/save", function(req, res, next) {
	var id = req.body.id
	var title = req.body.title
	var content = req.body.content

	Article.findByIdAndUpdate(id, {$set: {title: title, content: content}}, function(err){
		if(err){
			console.error(err)
		}else{
			responseData.message = "修改成功！"
  		res.json(responseData)
		}
	})
})
module.exports = router
