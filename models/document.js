var mongoose = require("mongoose")
var documentSchema = require("../schemas/document")

module.exports = mongoose.model("Document", documentSchema)
