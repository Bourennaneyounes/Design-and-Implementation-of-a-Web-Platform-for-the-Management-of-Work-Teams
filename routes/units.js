const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../modules/user");
const Unit = require("../modules/unit");
var middleware = require("../middleware");
//////////////////////////////////////////

/// templete to add untis
////////////////////////////////////////////
router.get("/user/:id/units/new" ,middleware.checkAdminOwnership,(req ,res)=>{
    
    User.findById(req.params.id,function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            res.render("units/new",{user: foundUser});
        }
   
   
})});

////// templete gere units
////////////////////////////////
router.get("/users/:id/units" ,middleware.checkAdminOwnership,(req ,res)=>{
    
    User.findById(req.params.id,function(err,user){
      if(err){
        console.log(err);
      }else{
        Unit.find(function(err,units){
            if(err){
                console.log(err);
            }else{
                var unitsForSearch = []
                units.forEach(unit=>{
                    unitsForSearch.push(unit);
                })
               // console.log(units);
                res.render("units/units",{units: units, user:user, unitsForSearch : JSON.stringify(unitsForSearch)});
            }
       
       
    })
      }
    });
   
});


//////////// logic add units
router.post("/user/:id/units" ,middleware.checkAdminOwnership,(req ,res)=>{
    User.findById(req.params.id,function(err,foundUser){
        if(err){
            console.log(err);
        }else{
    //console.log(req.body);
    //console.log(foundUser);
                   Unit.create(req.body.unit ,(err ,unit)=>{
                       if(err){throw err;}
                           else{
                           // console.log("unit add");
                  // console.log(foundUser.name);
                                      // console.log(foundUser );
                                      //unit.currentHead = foundUser;
                                     
                                     //console.log(unit);
                    //console.log(parent.name);
                }
                unit.save();
         });
            
            // console.log(unit.currentHead );
            res.redirect("/users/"+req.params.id+"/units");
        }
    })
});
/////////////////////////

////////show templete units settings
router.get("/users/:id/units/:unitId/settings" ,middleware.checkAdminOwnership,(req ,res)=>{
    
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
                    Unit.findById(req.params.unitId,function(err,unit){
                        if(err){
                            console.log(err);
                        }else{
                           var usersCh = [];

                           users.forEach(u=>{
                            // console.log(u)
                             //console.log(u.unit+"==="+unit._id)
                             //console.log(unit._id.equals(u.unit))
                             
                               if(unit._id.equals(u.unit) || u.unit===null || !(u.unit)){
                                 //console.log(u.unit!=unit._id)
                                   usersCh.push(u);
                               }
                           })
                           //unit.userList.splice(0,unit.userList.length);
                           //unit.save();
                            res.render("units/edit",{unit: unit, user:user , users:usersCh, units:units});
                        }
                   
                   
                })
                  }
                })
              
            }
        })
       
      }
    });
   
});
////////logic units settings
router.post("/users/:id/units/:unitId" ,middleware.checkAdminOwnership,(req ,res)=>{
    
    
    User.find(function(err,users){
      if(err){
        console.log(err);
      }else{
       
        Unit.findById(req.params.unitId,function(err,unit){
            if(err){
              console.log(err);
            }else{
              unit.userList.splice(0,unit.userList.length);
                           
              console.log(req.body.unitE);
              console.log(req.body.currentHead);
              if(req.body.currentHead!=null){
                User.findById(req.body.currentHead,function(err,user){
                  if(err){
                    console.log(err);
                  }else{
                    user.unit = unit._id;
                    user.save();
                  }
                })
                
                  unit.currentHead = req.body.currentHead;
                  unit.userList.push(req.body.currentHead);
                  unit.save()
              }else{
                unit.save()
              }
                



             if(req.body.unitE!==undefined){
             
                if(Array.isArray(req.body.unitE)){
                    function userExists(id) {
                        return req.body.unitE.some(function(el) {
                           // console.log(el+"===="+id);
                          return el == id;
                        }); 
                      }
                      users.forEach(user=>{
                       // console.log(unit._id.equals(user.unit)&&(userExists(user._id)));
                        //req.body.unitE.forEach(element=>{
                          
                            if((userExists(user._id)==false)&&(unit._id.equals(user.unit))){
                              User.findById(user._id,function(err,user1){
                                  if(err){
                                      console.log(err);
                                  }  else{
                                    Unit.findById(req.params.unitId,function(err,unit1){
                                      if(err){
                                             console.log(err);
                                      }else{
                                        if(user1._id.equals(unit1.currentHead)){
                                          unit1.currentHead=null;
                                          
                                        }
                                       // var index = unit.userList.indexOf(user1._id);
                                    //unit.userList.splice(index,1);
                                    unit1.save();
                                      }
                                    })
                                    
                                      user1.unit = null;
                                      user1.save();
                                  }
                                  
                                })
                            }
                        //})
                    })
                    req.body.unitE.forEach(employeId=>{
                        User.findById(employeId,function(err,user){
                          if(err){
                              console.log(err);
                          }  else{
                            Unit.findById(req.params.unitId,function(err,unit1){
                              if(err){
                                     console.log(err);
                              }else{
                                console.log(unit.userList.includes(user._id))
                              /*  if(!unit.userList.includes(user._id)){
                                  unit1.userList.push(user);
                                }
                                */
                                unit1.userList.push(user);
                                unit1.save();
                              }
                            })
                              user.unit = unit._id;
                              user.save();
                          }
                          
                        })
                    })
                  }else{
                    users.forEach(user=>{
                        //req.body.unitE.forEach(element=>{
                            if(!(user._id.equals(req.body.unitE))&&(unit._id.equals(user.unit))){
                              User.findById(user._id,function(err,user1){
                                  if(err){
                                      console.log(err);
                                  }  else{
                                    Unit.findById(req.params.unitId,function(err,unit1){
                                      if(err){
                                             console.log(err);
                                      }else{
                                        if(user1._id.equals(unit1.currentHead)){
                                          unit1.currentHead=null;
                                          unit1.save();
                                        }
                                      }
                                    })
                                      user1.unit = null;
                                      user1.save();
                                  }
                                  
                                })
                            }
                        
                    })
                    User.findById(req.body.unitE,function(err,user){
                        if(err){
                            console.log(err);
                        }  else{
                          Unit.findById(req.params.unitId,function(err,unit1){
                            if(err){
                                   console.log(err);
                            }else{
                              unit1.userList.push(user);
                              unit1.save();
                            }
                          })
                            user.unit = unit._id;
                            user.save();
                        }
                        
                      })
                  }
             }else{
                users.forEach(user=>{
                  if(unit._id.equals(user.unit)){
                          User.findById(user._id,function(err,user1){
                              if(err){
                                  console.log(err);
                              }  else{
                                Unit.findById(req.params.unitId,function(err,unit1){
                                  if(err){
                                         console.log(err);
                                  }else{
                                    if(user1._id.equals(unit1.currentHead)){
                                      unit1.currentHead=null;
                                      unit1.save();
                                    }
                                  }
                                })
                                  user1.unit = null;
                                  user1.save();
                              }
                              
                            })
                          
                          }
                   
                })
             }
              
              //var unitE = req.body.unitE;
                //  if(req.body.unitE.lenght>0){
                   
                //}
                
               
              res.redirect("/users/"+req.params.id+"/units");
            }
        })
       
      }
    });
   
});
 ///////// delete unit
router.delete("/users/:id/units/:unitId/delete" ,middleware.checkAdminOwnership,(req ,res)=>{
  User.find((err ,users)=>{
      if(err){
        throw err;
      }else{
        Unit.findById(req.params.unitId ,(err ,unit)=>{
          if(err){
            throw err;
          }else{
              users.forEach(user=>{
                if(unit._id.equals(user.unit)){
                  User.findById(user.id,function(err,userFound){
                    if(err){
                      console.log(err);
                    }else{
                      userFound.unit=null;
                      userFound.save();
                    }
                  })
                }
              })
            Unit.findByIdAndRemove(req.params.unitId ,(err)=>{
              if(err){
                throw err;
              }else{
                res.redirect("/users/"+req.params.id+"/units");
              }
              
          });
          }
      })
      
      }
    });
  })
      
                          
              
              
          
      
  



module.exports = router;