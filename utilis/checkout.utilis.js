const Sessions = require("../models/session.model");
const Users = require("../models/user.model");
const Books= require("../models/book.model")
exports.getBookCheckOut = async (req) => {
	const {sessionId,userId} = req.signedCookies;
	const storeTitle = [];
	let {cart}  = await Sessions.findById(sessionId)
	let {name} = await Users.findById(userId);
	cart.forEach(el => {
		storeTitle.push(el.title)
	})
	return {
		cart,
		name,
		storeTitle,
	}
}

