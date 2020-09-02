const express = require("express");
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const Unit = require("../modules/unit");
const User = require("../modules/user");
var middleware = require("../middleware");
//var fs = require("fs-js");
var fs = require("fs-extra");
const user = require("../modules/user");


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
       // console.log(user);
        //User.GetFullArrayTree(function(err ,tree){
            User.find(function(err ,tree){
            if(err){throw err;}
            else{
                //console.log(tree);
                var dataa = JSON.stringify(tree);
                //console.log(dataa);
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
                Unit.find(function(err ,units){
                    var A = 0;
                    res.render("charts/orgchart4" ,{dataa: dataa,treee:tree,units:units,A:A,user:user});
                })
                // console.log(dataa);
               // res.render("charts/orgchart4" ,{dataa: dataa,treee:tree});
             // res.render("../DHTMLX JS/samples/index.html" ,{dataa: dataa});
            }
        });
    });
   
});
//////////////////////////////////////////
router.post("/orgchart/:userId" ,middleware.isLoggedIn,(req ,res)=>{
   // User.findById(req.params.userId,(err,user)=>{
        //console.log(req.body.dat);
       /* function containsObject(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i] === obj) {
                    return true;
                }
            }
        
            return false;
        }
*/
       /* function userExists(username) {
            return arr.some(function(el) {
              return el.username === username;
            }); 
          }
        */

//var dataa = req.body.dat.replace('"class": "go.TreeModel","nodeDataArray":', '');
//console.log(req.body.dat);
var dataa = req.body.dat.slice(43);
   dataa =  dataa.slice(0,-1);
  // console.log(dataa);
   var dat =JSON.parse(dataa);
   function userExists(id) {
    return dat.some(function(el) {
        //console.log(el.id+"===="+id);
      return el.id == id;
    }); 
  }
   //console.log(dat.len);
   //console.log("////after");         
    dat.forEach(element1 => {
       dat.forEach(element2 => {
           if(element1.parent){
           if(element1.parent===element2.key){
              // console.log(element2.id);
              element1.parentId = element2.id;         
                             
                        
                       }
                   }
                   
                    });
            
        });
        //console.log(usersList);
        //User.save(usersList);
       
        //console.log(dat);

   /*User.bulkWrite([
    
    {
      updateMany: {
        filter: {},
        // If you were using the MongoDB driver directly, you'd need to do
        // `update: { $set: { title: ... } }` but mongoose adds $set for
        // you.
        update: {dat}
      }
    }
    
  ]).then(res => {
   // Prints "1 1 1"
   console.log(res.modifiedCount);
  });*/
   async function f1() {
 User.find((err,users)=>{
     
      
        users.forEach(element1 => {
            if(userExists(element1.id)===false)
            {
                
                User.findByIdAndRemove({ _id: element1.id },function(err,res){
                    if(err){
                        console.log("ppppp");
                    }else{
                        console.log("delted user :" + res); 
                    }
                });
            }else{
                dat.forEach(element2 => {
                    //console.log(dat.some(element1 => element1.id === element2.id));
                       if(element1.username==element2.username){
                          
                               //console.log("im here");
                              
                             //  console.log(mongoose.Types.ObjectId(element2.parentId));
                               //console.log(parentId1);
                               //mongoose.Types.ObjectId.isValid()
                               
                              User.findOne({_id:element1.id}, function(err, item) {
                                
                               /*if(element2.parentId!="null"){
                                   var parentId1 = mongoose.Types.ObjectId(element2.parentId);
                                   item.parentId = parentId1;
                               }*/
                                   //test.equal(null, err);
                                   //test.equal('world', item.hello);
                                   
                                   if(element2.parent){
                                       var parentId1 = element2.parentId;
                                       var parent1   = element2.parent;
                                       item.parentId = parentId1;
                                       item.parent= parent1;
                                   }else{
                                    var parent1   = element2.parent;
                                    item.parent= parent1;
                                   }
                                   var key1      = element2.key,
                                       name1      = element2.name,
                                       firstName1 = element2.firstName,
                                       lastName1  = element2.lastName,
                                       title1     = element2.title,
                                       positionName1 = element2.positionName;
           
                                       item.key = key1;
                                       item.name = name1;
                                       item.firstName = firstName1;
                                       item.lastName = lastName1;
                                       item.title = title1;
                                       item.positionName = positionName1;
                                       
                                       item.save();
           
                                   // Update the document
                                   //item['parentId'] = parentId;
                             
                                   // Save the item with the additional field
                                   //User.save(item, {w:1});
                               });
                              
                               //console.log(element1.hash);
                               //console.log(element2.key);
                               //User.bulk.find.replaceOne({"_id" : element1.id},element2);
               
                              // User.findByIdAndUpdate({id : "'"+element1.id+"'"}, element2 );
                              /* User.bulkWrite([
                                   {
                                       updateOne: {
                                         filter: {_id : element1.id},
                                         // If you were using the MongoDB driver directly, you'd need to do
                                         // `update: { $set: { title: ... } }` but mongoose adds $set for
                                         // you.
                                        // update: {name : element2.name}
                                         update: { parentId: parentId1},
                                        //upsert:true
                                       }
                                     }*/
                                  /* {
                                     replaceOne: {
                                       filter: {_id : element1.id},
                                       // If you were using the MongoDB driver directly, you'd need to do
                                       // `update: { $set: { title: ... } }` but mongoose adds $set for
                                       // you.
                                       //update: {name : element2.name}
                                      replacement: element2,
                                      upsert:true
                                     }
                                   }*/
                              /*  ]).then(res => {
                                  // Prints "1 1 1"
                                  console.log(res.modifiedCount);
                                 });
                           }*/
                          
                          /* User.findById({_id : element1.id}, function(err,doc){
                               if(err){
                                   console.log(err);
                               }else{
                                   doc = element2;
                                   User.replaceOne
                               }
                           });*/
                           
           //usersList.push(element2);
           
           //doc.name = 'foo';
           //await doc.save();
                            // console.log('"'+element1.id+'"');
                            // console.log(element1.id);
                           //User.findByIdAndUpdate({id : "'"+element1.id+"'"}, element2 );
                           //element1.save();
                       
                       }    
                   
                       
                   });
            }
            //console.log(dat.some(el => el.id === element1.id));
            //if (dat.some(function (element1) { return element1.Id == Id; })) { // do something }
           // console.log(containsObject(element1, dat));
           //console.log(dat.indexOf(element1));
           
           
        });
        
       });
   }
   f1();
   ////////////////////////
   /*User.find((err,users)=>{
    users.forEach(element1 => {
       users.forEach(element2 => {
           if(element1.parent){

       
           
           
           if(element1.parent===element2.key){
        User.findOne({_id:element1.id}, function(err, item) {
             
                         
                             var parentId1 = mongoose.Types.ObjectId(element2._id);
                             console.log(parentId1);
                             item.parentId = parentId1;
                             item.save();
                        });
                       }
                   }
                   
                    });
            
        });
        //console.log(usersList);
        //User.save(usersList);
       });*/
   ////////////////////////
     
   
  /*User.find().snapshot().forEach(
    function (e) {
      // update document, using its own properties
     // e.coords = { lat: e.lat, lon: e.lon };
  console.log(e);
      // remove old properties
      //delete e.lat;
      //delete e.lon;
  
      // save the updated document
      //db.events.save(e);
    }
  )*/
  
//    User.updateMany({}, { dat });
//console.log(dataa);

//user.save(dat);
//console.log(dat[0].key);
//console.log(user);   
//res.render("charts/orgchart4" ,{dataa: dataa});

         res.redirect("/orgchart/"+req.params.userId);
         
      /*  User.GetFullArrayTree(function(err ,tree){
            if(err){throw err;}
            else{
               // console.log(tree);
                var dataa = JSON.stringify(tree[0]);
                //console.log(dataa);
                res.render("charts/orgchart" ,{dataa: dataa,tree:tree});
             // res.render("../DHTMLX JS/samples/index.html" ,{dataa: dataa});
            }
        });*/
   // });
   
});
//get a specific department orgchart
/*router.get("/orgchart/:id/:departmentId" ,middleware.isLoggedIn,(req ,res)=>{
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
*/


/*router.get("/orgchart/:userId/units/:unitId" ,middleware.isLoggedIn,(req ,res)=>{
    Unit.findById(req.params.unitId,(err,unit)=>{
        //User.GetFullArrayTree(function(err ,tree){
      User.findById(unit.currentHead,(err,user)=>{
         User.find(function(err ,users){
            users.forEach(u=>{
                
            })

            })
         }) 
      });  
             
        });
  */
 router.get("/orgchart/:userId/units/:unitId" ,middleware.isLoggedIn,(req ,res)=>{
    
        //User.GetFullArrayTree(function(err ,tree){
            //console.log(user)
            
          User.findById(req.params.userId,function(err,user1){
                  if(err){
                      console.log(err);
                  }else{
                    User.find(function(err,users){
                   
                        Unit.findById(req.params.unitId,function(err ,unit){
                            function userExists(id) {
                                return unit.userList.some(function(el) {
                                    //console.log(el+"===="+id);
                                    //console.log(el.equals(id));
                                  return el.equals(id);
                                }); 
                              }
                            var tree = [];
                            users.forEach(user=>{
                                if(userExists(user._id)){
                                    tree.push(user);
                                }
                            })
                            // f2(unit,tree);
                           // console.log(tree)
                            var dataa = JSON.stringify(tree);
                            //console.log(dataa);
                            Unit.find(function(err ,units){
    
                                var A=1;
                                res.render("charts/orgchart4" ,{dataa: dataa,treee:tree,units:units,A:A,unit:unit,user:user1});
                            })
                        })
                       
                       
                    })
                  }
          })  
               
                
               /* unit.userList.forEach(user1=>{
                    
                    User.findById(user1,function(err,user2){
                        if(err){
                            console.log(err)
                        }else{
                           // console.log(user2)
                            tree.push(user2);
                            
                           // console.log(tree)
                        }
                        console.log(tree);
                    })
                })*/
               // console.log(tree)
            
         
           
    
   
}); 


router.post("/orgchart/:userId/units/:unitId" ,middleware.isLoggedIn,(req ,res)=>{
   
 
 //var dataa = req.body.dat.replace('"class": "go.TreeModel","nodeDataArray":', '');
 //console.log(req.body.dat);
 var dataa = req.body.dat.slice(43);
    dataa =  dataa.slice(0,-1);
   // console.log(dataa);
    var dat =JSON.parse(dataa);
    function userExists2(id) {
     return dat.some(function(el) {
         //console.log(el.id+"===="+id);
       return el.id == id;
     }); 
   }
    //console.log(dat.len);
    //console.log("////after");         
     dat.forEach(element1 => {
        dat.forEach(element2 => {
            if(element1.parent){
            if(element1.parent===element2.key){
               // console.log(element2.id);
               element1.parentId = element2.id;         
                              
                         
                        }
                    }
                    
                     });
             
         });
         
    async function f1() {
       
  User.find((err,tree)=>{
    var users = [];
    Unit.findById(req.params.unitId,function(err ,unit){
        function userExists(id) {
            return unit.userList.some(function(el) {
                //console.log(el+"===="+id);
                //console.log(el.equals(id));
              return el.equals(id);
            }); 
          }
        
        tree.forEach(user=>{
            if(userExists(user._id)){
                users.push(user);
            }
        })
        console.log(users)
    
    
         users.forEach(element1 => {
             if(userExists2(element1.id)===false)
             {
                 
                 User.findByIdAndRemove({ _id: element1.id },function(err,res){
                     if(err){
                         console.log("ppppp");
                     }else{
                         console.log("delted user :" + res); 
                     }
                 });
             }else{
                 dat.forEach(element2 => {
                     //console.log(dat.some(element1 => element1.id === element2.id));
                        if(element1.username==element2.username){
                           
                                //console.log("im here");
                               
                              //  console.log(mongoose.Types.ObjectId(element2.parentId));
                                //console.log(parentId1);
                                //mongoose.Types.ObjectId.isValid()
                                
                               User.findOne({_id:element1.id}, function(err, item) {
                                 
                           
                                    
                                    if(element2.parent){
                                        var parentId1 = element2.parentId;
                                        var parent1   = element2.parent;
                                        item.parentId = parentId1;
                                        item.parent= parent1;
                                    }else{
                                     var parent1   = element2.parent;
                                     item.parent= parent1;
                                    }
                                    var key1      = element2.key,
                                        name1      = element2.name,
                                        firstName1 = element2.firstName,
                                        lastName1  = element2.lastName,
                                        title1     = element2.title,
                                        positionName1 = element2.positionName;
            
                                        item.key = key1;
                                        item.name = name1;
                                        item.firstName = firstName1;
                                        item.lastName = lastName1;
                                        item.title = title1;
                                        item.positionName = positionName1;
                                        
                                        item.save();
            
                                });
                               
                         
                        }    
                    
                        
                    });
             }
           
            
            
         });
         
        });
    })
    }
    f1();
   
 
          res.redirect("/orgchart/"+req.params.userId);
          
      
    
 });
 
 
 

module.exports = router;