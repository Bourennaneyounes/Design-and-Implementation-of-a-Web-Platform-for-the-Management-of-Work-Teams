const mongoose = require("mongoose");
const User = require("./user");
var materializedPlugin = require('mongoose-materialized');



var postSchema = mongoose.Schema({
    type: String,
    occupation: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
});
postSchema.plugin(materializedPlugin);

module.exports = new mongoose.model('Post',postSchema);