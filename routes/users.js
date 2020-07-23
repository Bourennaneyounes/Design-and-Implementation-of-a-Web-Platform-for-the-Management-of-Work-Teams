const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../modules/user");
const Unit = require("../modules/unit");
const Project = require("../modules/project");
const Tree = require('../modules/projectTree');
const Mail = require('../modules/mail');
const Message = require('../modules/message');
const mongoose = require('mongoose');
var middleware = require("../middleware");


//show profil
router.get("/users/:id/profil" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        else{
            User.find({} ,'-children -events -sentProjects -receivedProjects -tags -office -firstName -lastName -area -isLoggedUser -assignedProjects -sentMails -receivedMails -contacts -unit' ,(err ,usersList)=>{
                if(err){throw err;}
                res.render("users/profil" ,{user: user ,usersList :usersList });
            });
            //res.render("users/profil" ,{user: user,usersList: JSON.stringify(usersList)});
        }
    });
   
});
///// show gestion post
router.get("/users/:id/profil/post" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        else{
            res.render("users/post", {user :user});
        }
    });
   
  
   
});
//////////////////add post
router.get("/users/:id/profil/post/new" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        else{ res.render("users/newPost",{user :user});
    }
  });
});
////////////////// modifier
router.get("/users/:id/profil/post/edit" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        else{ res.render("users/editPost",{user :user});
    }
  });
});
module.exports = router;