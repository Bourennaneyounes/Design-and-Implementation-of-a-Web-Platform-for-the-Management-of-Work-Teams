const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../modules/user");
const Unit = require("../modules/unit");
var middleware = require("../middleware");

router.get("/user/:id/units/new" ,middleware.isLoggedIn,(req ,res)=>{
    
    User.findById(req.params.id,function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            res.render("units/new",{user: foundUser});
        }
   
   
})});
router.post("/user/:id/units" ,middleware.isLoggedIn,(req ,res)=>{
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
                                      unit.currentHead = foundUser;
                                     
                                     //console.log(unit);
                    //console.log(parent.name);
                }
                unit.save();
         });
            
            // console.log(unit.currentHead );
            res.redirect("/orgchart/"+req.params.id);
        }
    })
});

module.exports = router;