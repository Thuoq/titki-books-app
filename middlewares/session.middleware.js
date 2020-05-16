const Sessions  = require("../models/session.model");
module.exports =  (req,res,next) => {
	if(!req.signedCookies.sessionId) {
		let session = new Sessions();
		let idSession =  session.id;
		res.cookie('sessionId', idSession ,{ 
			signed: true
		});
		session.save();
	}
	next();
}