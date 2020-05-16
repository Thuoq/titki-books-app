const db = require('../db');
const Sessions = require("../models/session.model"); 
const getCountItem = require("../utilis/book.utilis");
exports.authSignIn  = async (req,res) => {
	try{
		const {sessionId} = req.signedCookies;
		let totalItem = await getCountItem(req)
			res.render("authentication/signin",{
			number : totalItem 
		})
	} catch(err) {
		console.log(err);
	}
}
exports.authSignInSuceess = (req,res) => {
	res.redirect("/trancation")
}
exports.authSignOut = (req,res) => {
	res.clearCookie("userId");
	res.redirect("/auth");
}
exports.authSignUp = async (req,res) => {
	try{
		const {sessionId} = req.signedCookies;
		let totalItem = await getCountItem(req)
		res.render("authentication/signup",{
			number : totalItem 
		})
	} catch(err){
		console.log(err)
	}
}

