var express = require("express")
var router = express.Router()
var Doc = require("../models/doc")

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
router.post("/doc/del", function(req, res, next) {
	console.log("del")
	var id = req.body.id
	Doc.findByIdAndRemove(id).then(function(doc){
		res.send(doc)
	})
})

// 查看文档详情
router.get("/doc/modify", function(req, res, next) {
	var id = req.query.id
	var title = req.query.title
	var content = req.query.content
	res.render("admin/doc_modify", {id:id, title:title, content:content})
})

module.exports = router
