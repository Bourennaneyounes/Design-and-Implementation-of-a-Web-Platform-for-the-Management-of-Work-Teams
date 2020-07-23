var User = require("../modules/user");
//var Project = require("../modules/project");

var middlewareObj ={};





middlewareObj.checkOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		 User.findById(req.params.id, function(err, foundUser){
			       if(err){
					  // req.flash("error","Somthing Wrong");
				              res.redirect("back");
			        }else{
				             if(foundUser._id.equals(req.user._id)){
					                                       next();
				             }else{
							//	 req.flash("error","You don't have permission to do that");
					                                res.redirect("back");
				                 }
			            }
		     });
	}else{
	//	req.flash("error","You need to be logged in");
		 res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	//req.flash("error","You need to be logged in");
	res.redirect("/login");
}




module.exports = middlewareObj;