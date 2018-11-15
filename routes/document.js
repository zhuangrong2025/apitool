var express = require("express")
var router = express.Router()
// Document 自动对应或生成的是数据库集合documents
var Document = require("../models/document")
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

//vue文章列表
router.get("/list", function(req, res, next) {
	Document.find().then(function(documents){
		res.json(documents)
	})
})

module.exports = router
