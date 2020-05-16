const mongoose = require("mongoose");
const User = require("./user");
var materializedPlugin = require('mongoose-materialized');



var unitSchema = mongoose.Schema({
    type: String,
    value: String,
    desc: String,
    currentHead: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
});
unitSchema.plugin(materializedPlugin);

module.exports = new mongoose.model('Unit',unitSchema);