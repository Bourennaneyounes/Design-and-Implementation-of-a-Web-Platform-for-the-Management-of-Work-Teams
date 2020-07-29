const express = require("express");
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const Unit = require("../modules/unit");
const User = require("../modules/user");
var middleware = require("../middleware");
//var fs = require("fs-js");
var fs = require("fs-extra");


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
                var dataa = JSON.stringify(tree);
                var dat =JSON.parse(dataa);
                fs.outputFile('C:/myapp/master/public/scripts/d2.js', dataa, function(err){
                    if (err) return console.log(err) // => null
                    console.log('success!')
                  })
                /* fs.writeJson('C:/myapp/master/public/scripts/d1.js', dataa, err => {
                    if (err) return console.error(err)
                    console.log('success!')
                  })*/
               /* fs.appendFile("C:/myapp/master/public/scripts/ddddatttaaa.js",dataa,function(err){
                    if(err) throw err;
                    console.log("saved");
                })*/
                //console.log(tree);
                
                // console.log(dataa);
                res.render("charts/orgchart2" ,{dataa: dataa,tree:tree});
             // res.render("../DHTMLX JS/samples/index.html" ,{dataa: dataa});
            }
        });
    });
   
});
//////////////////////////////////////////
/*router.post("/orgchart/:userId" ,middleware.isLoggedIn,(req ,res)=>{
    User.findById(req.params.userId,(err,user)=>{
        User.GetFullArrayTree(function(err ,tree){
            if(err){throw err;}
            else{
               // console.log(tree);
                var dataa = JSON.stringify(tree[0]);
                //console.log(dataa);
                res.render("charts/orgchart" ,{dataa: dataa,tree:tree});
             // res.render("../DHTMLX JS/samples/index.html" ,{dataa: dataa});
            }
        });
    });
   
});*/
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