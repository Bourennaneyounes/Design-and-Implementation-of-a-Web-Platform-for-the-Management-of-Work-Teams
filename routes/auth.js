const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({mergeParams: true});
const passport = require("passport");
const User = require("../modules/user");
const Unit = require("../modules/unit");

///////////////////////////////////////////////landing
router.get("/" ,(req ,res)=>{
    
        res.render("auth/home" );
    
});


/////////////////////////////////////////////////
//regestering:
router.get("/register" ,(req ,res)=>{
    Unit.find({} ,'-desc' ,(err ,units)=>{
        res.render("auth/register" ,{units: units});
    });
});
router.post("/register" , (req ,res)=>{
	var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
		name: req.body.firstName+" "+req.body.lastName,
		equipe: req.body.equipe,
		
	//	parentId: '000000000000000000000000',
		//unit: req.body.unit,
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        profileUrl: "http://example.com/employee/profile",
        office: "CEO office",
        tags: "Ceo,tag1, tag2",
        isLoggedUser: false,
        positionName: "CTO ",
        events: []
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
					                    res.render("auth/register");
				               }else{
								   
								  var parent = new User({});
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
										   passport.authenticate("local")(req ,res ,()=>{
											console.log(req.params);  
											res.redirect("/orgchart/"+user._id);   
											 
																		});
								  });
								 
				                 }
			      });
		   /* }*/
	});
        

	

//logging in:
router.get("/login" ,(req ,res)=>{
	res.render("auth/login");
});
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
	  if (err) { return next(err); }
	  if (!user) { return res.redirect('/login'); }
	  req.logIn(user, function(err) {
		if (err) { return next(err); }
		return res.redirect('/orgchart/' + user._id);
	  });
	})(req, res, next);
  });
/*router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
	
   // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
   return res.redirect("/orgchart/"+req.user._id);
	  }
 
  );*/
  /* router.post("/login" ,function (req,res){
	
		User.find({username:req.body.username},function(err,user){ 
	   console.log(user);
	                   passport.authenticate("local" ,function(err){
	                            if(err){
									console.log(err);
									res.redirect("/login");
								}else{
									res.redirect("/orgchart/"+user._id);
								}
                                 //  successRedirect: "/orgchart/"+user._id,
	                               // failureRedirect: "/login"
                            })  
        })})  ;*//*,(req ,res)=>{

}});*/

//logging out:

router.get("/logout" ,(req ,res)=>{
	req.logout();
	res.redirect("/login");
});

module.exports = router;