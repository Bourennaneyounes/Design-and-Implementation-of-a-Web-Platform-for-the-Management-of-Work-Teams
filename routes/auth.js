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