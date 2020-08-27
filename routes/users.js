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



////////////////////////////
/////// show users templete
router.get("/users/:id/profil/gestionUsers" ,middleware.isLoggedIn,(req ,res)=>{
    //res.send("hhhhhhhhhhhhhh");
    User.find(function(err,users){
        if(err){
          console.log(err);
        }else{
          User.findById(req.params.id,function(err,user){
              if(err){
                      console.log(err);
              }else{
                  Unit.find(function(err,units){
                    if(err){
                      console.log(err);
                    }else{
                            // var usersCh = [];
  
                             //users.forEach(u=>{
                              // console.log(u)
                               //console.log(u.unit+"==="+unit._id)
                               //console.log(unit._id.equals(u.unit))
                               
                                 //if(unit._id.equals(u.unit) || u.unit===null || !(u.unit)){
                                   //console.log(u.unit!=unit._id)
                                     //usersCh.push(u);
                                 //}
                             //})
                             //unit.userList.splice(0,unit.userList.length);
                             //unit.save();
                             
                              res.render("users/gestionUsers",{user:user , users:users, units:units});
                          
                     
                     
                  
                    }
                  })
                
              }
          })
         
        }
      });
});
///////////////////////////////
////////////////////logic modifie users
router.post("/users/:id/profil/gestionUsers" ,middleware.isLoggedIn,(req ,res)=>{
    User.find(function(err,users){
        if(err){
          console.log(err);
        }else{
         
                
                             
                console.log(req.body.admin);
                
              
                  
  
  
  
               if(req.body.admin!==undefined){
               
                  if(Array.isArray(req.body.admin)){
                      function userExists(id) {
                          return req.body.admin.some(function(el) {
                             // console.log(el+"===="+id);
                            return el == id;
                          }); 
                        }
                        users.forEach(user=>{
                         // console.log(unit._id.equals(user.unit)&&(userExists(user._id)));
                          //req.body.admin.forEach(element=>{
                            
                              if((userExists(user._id)==false)){
                                User.findById(user._id,function(err,user1){
                                    if(err){
                                        console.log(err);
                                    }  else{
                                 
                                      
                                        user1.admin = false;
                                        user1.save();
                                    }
                                    
                                  })
                              }
                          //})
                      })
                      req.body.admin.forEach(employeId=>{
                          User.findById(employeId,function(err,user){
                            if(err){
                                console.log(err);
                            }  else{
                           
                                user.admin = true;
                                user.save();
                            }
                            
                          })
                      })
                    }else{
                      users.forEach(user=>{
                          //req.body.unitE.forEach(element=>{
                              if(!(user._id.equals(req.body.admin))){
                                User.findById(user._id,function(err,user1){
                                    if(err){
                                        console.log(err);
                                    }  else{
                                     
                                        user1.admin = false;
                                        user1.save();
                                    }
                                    
                                  })
                              }
                          
                      })
                      User.findById(req.body.admin,function(err,user){
                          if(err){
                              console.log(err);
                          }  else{
                           
                              user.admin = true;
                              user.save();
                          }
                          
                        })
                    }
               }else{
                  users.forEach(user=>{
                    
                            User.findById(user._id,function(err,user1){
                                if(err){
                                    console.log(err);
                                }  else{
                                 
                                    user1.admin = false;
                                    user1.save();
                                }
                                
                              })
                            
                            
                     
                  })
               }
                
                //var unitE = req.body.unitE;
                  //  if(req.body.unitE.lenght>0){
                     
                  //}
                  
                 
                  res.redirect("/users/"+req.params.id+"/profil");
              
          
         
        }
      });
    
});
/////////////////////////



//////////////////////
//regestering:
router.get("/users/:id/profil/gestionUsers/register" ,(req ,res)=>{
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log(err)
        }else{
            Unit.find({} ,'-desc' ,(err ,units)=>{
                if(err){
                    console.log(err)
                }else{
                    res.render("auth/register" ,{units: units, user : user});
                }
                
            });
        }
    })
    
});
router.post("/users/:id/profil/gestionUsers/register" , (req ,res)=>{
	var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
		name: req.body.firstName+" "+req.body.lastName,
		//equipe: req.body.equipe,
		
	//	parentId: '000000000000000000000000',
		//unit: req.body.unit,
      //  imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        //profileUrl: "http://example.com/employee/profile",
        //office: "CEO office",
        //tags: "Ceo,tag1, tag2",
        //isLoggedUser: false,
        //positionName: "CTO ",
        //events: []
	});
	/*Unit.findById(req.body.unit ,(err ,unit)=>{
        if(err){
			throw err;
		}
         else{
	*/
			  User.register(newUser ,req.body.password ,function(err ,user){
				               if(err){
					                    throw err;
					                    //res.render("auth/register");
				               }else{
								   
								 // var parent = new User({});
								  //console.log(parent);
								 /* User.findById(unit.currentHead,function(err,foundUser){
                                         if(err){
											 console.log(err);
										 }else{
											//console.log(foundUser.name);
											 parent = foundUser;
											 //console.log(parent.name);
										 }
								  });*/
								  user.id = user._id;
								  user.save(function(err,user){
                                    res.redirect("/users/"+req.params.id+"/profil/gestionUsers");
									console.log("new child save");
									/*parent.appendChild(user,function(err){
										if(err){
	
											  console.log("new child didnt append");
										   }else{
											  console.log("new child  append succcccccc");
											 }
										  passport.authenticate("local")(req ,res ,()=>{
											console.log(req.params);  
											res.redirect("/orgchart/"+user._id);   
												  
										   });*/
										  /* passport.authenticate("local")(req ,res ,()=>{
											console.log(req.params);  
											res.redirect("/orgchart/"+user._id);   
											 
																		});*/
								  });
								 
				                 }
			      });
		   /* }*/
	});
        

//show profil
router.get("/users/:id/profil" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        else{
            Unit.find({} ,'-desc' ,(err ,units)=>{
                if(err){
                    console.log(err)
                }else{
                    res.render("users/profil" ,{units: units, user : user});
                }
                
            });
            /*User.find({} ,'-children -events -sentProjects -receivedProjects -tags -office -firstName -lastName -area -isLoggedUser -assignedProjects -sentMails -receivedMails -contacts -unit' ,(err ,usersList)=>{
                if(err){throw err;}
                res.render("users/profil" ,{user: user ,usersList :usersList });
            });*/
       
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