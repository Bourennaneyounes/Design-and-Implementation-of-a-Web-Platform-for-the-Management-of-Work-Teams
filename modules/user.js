const mongoose = require("mongoose");
const Unit = require("./unit");
const Post = require("./post");
const Project = require("./project");
const Mail = require("./mail");
const Message = require("./message");
// const eventSchema = require("./event");
const Event = require("./event");
const passportLocalMongoose = require("passport-local-mongoose");
materializedPlugin = require('mongoose-materialized');
const conn = require('./connection');


messageNotificationSchema = mongoose.Schema({
  from: String,
  count: Number,
  at: String
});

const userSchema = mongoose.Schema({
  id : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  username: String,
  password : String,
  firstName: String,
  lastName: String,
  name: String,
  admin : {type: Boolean , default: false},
  dateNaissance : Date,
  email : String,
  telephone : Number,
  address : String,
  country : String,
  city : String,
  codePostal : Number,
  aboutMe : String,
  image : String,
  key: Number,
  parent:Number,
  //parentId : {type: mongoose.Schema.Types.ObjectId, ref:'User', default: '000000000000000000000000'},
  //imageUrl: {type: String ,default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQMDZH1hAZTs5H364fQPBj33spP6P8mi_CkfmHKcOUYArZ3LYTt"},
  //area: {type: String ,default: "Corporate"},
  //profileUrl: {type: String ,default: ""},
  title: {type : String, default : ''},

  //tags: String,
  isLoggedUser: {type: Boolean , default: false},
  unit: {type: mongoose.Schema.Types.ObjectId, ref:'Unit'},
  //post: {type: mongoose.Schema.Types.ObjectId, ref:'Post'},
  positionName: {type : String, default: ''},

  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref:'User'}],

  // events: [eventSchema],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref:'Event'}],
  // plannedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref:'Event'}],

  sentProjects: [{ type: mongoose.Schema.Types.ObjectId, ref:'Project'}],
  assignedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref:'Project'}],
  receivedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref:'Project'}],

  sentMails: [{ type: mongoose.Schema.Types.ObjectId, ref:'Mail'}],
  sentMailsStorage: {type: Number ,default: 50000000000},
  usedSentMailsStorage : {type: Number ,default: 0},

  receivedMails: [{type: mongoose.Schema.Types.ObjectId, ref:'Mail'}],
  receivedMailsStorage: {type: Number ,default: 50000000000},
  usedReceivedMailsStorage : {type: Number ,default: 0},

  sentMessages: [{ type: mongoose.Schema.Types.ObjectId, ref:'Message'}],
  receivedMessages: [{type: mongoose.Schema.Types.ObjectId, ref:'Message'}],

  messageNotifications: {
    count: {type: Number ,default: 0},//[],
    array: []
  },
  mailNotifications: {
    count: {type: Number ,default: 0},
    array: []
  },
  bellNotifications: {
    count: {type: Number ,default: 0},
    array: []
  }
  
});

// var autoPopulateChildren = function(next) {
//   this.populate('children');
//   next();
// };
// var autoPopulateUnits = function(next) {
//   this.populate('unit' ,'-desc');
//   next();
// };

// userSchema
// .pre('findOne', autoPopulateChildren)
// .pre('find', autoPopulateChildren)
// .pre('findOne', autoPopulateUnits)
// .pre('find', autoPopulateUnits);


userSchema.plugin(materializedPlugin);
userSchema.plugin(passportLocalMongoose);
//module.exports = new mongoose.model('User' ,userSchema);
module.exports = conn.model('User' ,userSchema);
