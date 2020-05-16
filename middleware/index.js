var user = require("../modules/user");
var project = require("../modules/project");
//var comment = require("../models/comment");
var middlewareObj ={};


/*middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		 comment.findById(req.params.comment_id, function(err, foundComment){
			       if(err){
					   	req.flash("error","Somthing Wrong");
				              res.redirect("back");
			        }else{
				             if(foundComment.author.id.equals(req.user._id)){
					                                       next();
				             }else{
								 	req.flash("error","You don't have permission to do that");
					                                res.redirect("back");
				                 }
			            }
		     });
	}else{
		 res.redirect("back");
	}
}


*/

middlewareObj.checkProjectOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		 project.findById(req.params.id, function(err, foundproject){
			       if(err){
					  // req.flash("error","Somthing Wrong");
				              res.redirect("back");
			        }else{
				             if(foundproject.author.id.equals(req.user._id)){
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