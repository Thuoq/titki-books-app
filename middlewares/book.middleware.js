const Users = require("../models/user.model");

exports.verifyCheckOutPage = async (req,res,next) => {
	const {userId} = req.signedCookies;
	if(!userId) {
		res.redirect("/auth");
		return;
	}
	let {name} = await Users.findById({_id : userId });
	res.locals.user = {name: name};
	next();
}
