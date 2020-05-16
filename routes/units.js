const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../modules/user");
const Unit = require("../modules/unit");

router.get("/units/new" ,(req ,res)=>{
   
    res.render("units/new");
});
router.post("/units" ,(req ,res)=>{
    console.log(req.body);
    Unit.create(req.body.unit ,(err ,unit)=>{
        if(err){throw err;}
        else{
            User.findById(user._id,function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                  // console.log(foundUser.name);
                  console.log(foundUser );
                   unit.currentHead = foundUser;
                    //console.log(parent.name);
                }
         });
            unit.save();
             console.log(unit.currentHead );
            res.redirect("/orgchart");
        }
    })
});

module.exports = router;