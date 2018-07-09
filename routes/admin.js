var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("admin/index", { title: "后台首页" })
})
router.get("/doc", function(req, res, next) {
	res.render("admin/doc", { title: "文档列表2" })
})

module.exports = router
