const express = require("express");
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const Unit = require("../modules/unit");
const User = require("../modules/user");
var middleware = require("../middleware");

//get the company's full orgchart
/*router.get("/orgchart" ,middleware.isLoggedIn,(req ,res)=>{
    User.GetFullArrayTree(function(err ,tree){
        if(err){throw err;}
        else{
            
            var dataa = JSON.stringify(tree[0]);
            res.render("charts/orgchart" ,{dataa: dataa});
        }
    });
});*/
router.get("/orgchart/:userId" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.userId,(err,user)=>{
        User.GetFullArrayTree(function(err ,tree){
            if(err){throw err;}
            else{
                console.log(tree);
                var dataa = JSON.stringify(tree[0]);
                
                res.render("charts/orgchart" ,{dataa: dataa});
            }
        });
    });
   
});
//get a specific department orgchart
router.get("/orgchart/:id/:departmentId" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.id,(err,user)=>{
        Unit.findById(req.params.departmentId ,(err ,unit)=>{
            if(err){throw err;}
            else{
                User.GetArrayTree(unit.currentHead, (err ,tree)=>{
                    if(err){throw err;}
                    else{
                        Unit.find({} ,'-desc' ,(err ,units)=>{
                            var dataa =JSON.stringify(tree[0]);
                            res.render("charts/orgchart" ,{dataa: dataa,user:user ,units:units});
                        });
                        
                    }
                });
            }
        });
    });
   
});




module.exports = router;