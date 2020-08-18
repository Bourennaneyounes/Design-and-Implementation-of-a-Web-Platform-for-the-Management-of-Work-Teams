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
//const fileUpload = require('express-fileupload');
//const path = require('path');
//const multer = require('multer');


//show profil
router.get("/users/:id/profil" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        else{
            /*User.find({} ,'-children -events -sentProjects -receivedProjects -tags -office -firstName -lastName -area -isLoggedUser -assignedProjects -sentMails -receivedMails -contacts -unit' ,(err ,usersList)=>{
                if(err){throw err;}
                res.render("users/profil" ,{user: user ,usersList :usersList });
            });*/
        res.render("users/profil" ,{user: user/*,usersList: JSON.stringify(usersList)*/});
        }
    });
   
});
////////////////////////////
/////show templete to change password
router.get("/users/:id/profil/settings" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        else{
            /*User.find({} ,'-children -events -sentProjects -receivedProjects -tags -office -firstName -lastName -area -isLoggedUser -assignedProjects -sentMails -receivedMails -contacts -unit' ,(err ,usersList)=>{
                if(err){throw err;}
                res.render("users/profil" ,{user: user ,usersList :usersList });
            });*/
        res.render("users/editPassword" ,{user: user/*,usersList: JSON.stringify(usersList)*/});
        }
    });
   
});
/////////////////////////
//////logic change password
router.post("/users/:id/profil/settings" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;
 
          } else {
                        if(req.body.newPassword!=req.body.cNewPassword){
                           
                            console.log("confermation wrong");
                            res.redirect("/users/"+user._id+"/profil/settings");
                        }else{
                      user.changePassword(req.body.oldPassword, req.body.newPassword, function(err) {
                         if(err) {
                             
                                  if(err.name === 'IncorrectPasswordError'){
                                      console.log("wrong old password");
                                       //res.json({ success: false, message: 'Incorrect password' }); // Return error
                                       res.redirect("/users/"+user._id+"/profil/settings");
                                  }
                        } else {
                          //res.json({ success: true, message: 'Your password has been changed successfully' });
                          res.redirect("/users/"+user._id+"/profil");
                         }
                       });
                    
                    }
                  }
                  
        
        
    });
   
});

///modifie image profil
////////////////////////////////
router.post("/users/:id/profil/mod" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        else{
           // var newUser = new User({
                //user.username = req.body.username;
               console.log(req.files);
               // console.log(req.body.imgUrl);
                user.image=req.body.imgUrl
                //equipe: req.body.equipe,
            //	parentId: '000000000000000000000000',
                //unit: req.body.unit,
                //imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
                //profileUrl: "http://example.com/employee/profile",
                //office: "CEO office",
                //tags: "Ceo,tag1, tag2",
                //isLoggedUser: false,
                //positionName: "CTO ",
                //events: []
           // });
           //user.save();
            res.redirect("/users/"+user._id+"/profil"); 
        //res.render("users/profil" ,{user: user/*,usersList: JSON.stringify(usersList)*/});
        }
    });
   
});
//modifie profil logic
///////////////////////////////////////
router.post("/users/:id/profil" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        else{
           // var newUser = new User({
                user.username = req.body.username;
                user.firstName= req.body.firstName;
                user.lastName= req.body.lastName;
                user.name= req.body.firstName+" "+req.body.lastName;
                user.email= req.body.email;
                user.telephone= req.body.telephone;
                user.address = req.body.address;
                user.country= req.body.country;
                user.city= req.body.city;
                user.codePostal= req.body.codePostal;
                user.aboutMe = req.body.aboutMe;
                console.log(req.body.aboutMe);
                //equipe: req.body.equipe,
            //	parentId: '000000000000000000000000',
                //unit: req.body.unit,
                //imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
                //profileUrl: "http://example.com/employee/profile",
                //office: "CEO office",
                //tags: "Ceo,tag1, tag2",
                //isLoggedUser: false,
                //positionName: "CTO ",
                //events: []
           // });
           user.save();
            res.redirect("/users/"+user._id+"/profil"); 
        //res.render("users/profil" ,{user: user/*,usersList: JSON.stringify(usersList)*/});
        }
    });
   
});
///// show gestion post
/*router.get("/users/:id/profil/post" ,middleware.isLoggedIn,(req ,res)=>{
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
});*/
module.exports = router;