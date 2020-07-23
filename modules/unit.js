const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./post");
var materializedPlugin = require('mongoose-materialized');



var unitSchema = mongoose.Schema({
    type: String,
    value: String,
    desc: String,
    currentHead: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    postList:[{type: mongoose.Schema.Types.ObjectId, ref:'Post'}]
});
unitSchema.plugin(materializedPlugin);

module.exports = new mongoose.model('Unit',unitSchema);