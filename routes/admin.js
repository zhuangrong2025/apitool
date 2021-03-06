var express = require("express")
var router = express.Router()
var Doc = require("../models/doc")
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

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("admin/index", { title: "后台首页" })
})

//文档列表
router.get("/doc", function(req, res, next) {
	Doc.find().then(function(docs){
		res.render("admin/doc", { docs: docs})
	})
})

//文档新增
router.get("/doc_add", function(req, res, next) {
	res.render("admin/doc_add", { title: "文档新增" })
})
router.post("/doc_add", function(req, res, next) {
	var title = req.body.title
	var content = req.body.content
	// //添加记录
	var doc = new Doc({
		title: title,
		content: content
	})
	doc.save().then(function(info){
		responseData.message = "提交成功！"
		res.json(responseData)
	})

})

// 删除文档
router.delete("/doc/:id", function(req, res, next) {
	var id = req.params.id
	Doc.findByIdAndRemove(id).then(function(doc){
		res.send(doc)
	})
})

// 查看文档详情
// router.get("/doc/modify", function(req, res, next) {
// 	var id = req.query.id
// 	var title = req.query.title
// 	var content = req.query.content
// 	res.render("admin/doc_modify", {id:id, title:title, content:content})
// })

// rest api 2018-11-14
router.get("/doc/modify/:id/:title", function(req, res, next) {
	var id = req.params.id
	var title = req.params.title
	res.render("admin/doc_modify_rest", {id: id, title: title})
})


// rest api 2018-11-14
router.get("/doc/view/:id", function(req, res, next) {
	var id = req.params.id
	console.log(id);

})

// 保存文档修改信息
router.post("/doc/save", function(req, res, next) {
	var id = req.body.id
	var title = req.body.title
	Doc.findByIdAndUpdate(id, {$set: {title: title}}, function(err){
		if(err){
			console.error(err)
		}else{
			responseData.message = "修改成功！"
  		res.json(responseData)
			console.log("updated123")
		}
	})
})

// 接收vue请求 -- 临时
router.get("/doc_add_vue", function(req, res, next) {
	console.log("json")
	res.json({ title: "文档新增11" })
})

// vue数据提交
router.post("/add_article", function(req, res, next) {
	var title = req.body.title
	var article = req.body.article
	console.log(title + "*****" + article)
})


module.exports = router
