var mongoose = require("mongoose")
var docSchema = require("../schemas/doc")

module.exports = mongoose.model("Doc", docSchema)
