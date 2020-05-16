const Sessions = require("../models/session.model");

const getCountItem = async (req) => {
	const {sessionId} = req.signedCookies;
	let getCartItem = await Sessions.findById(sessionId);
	let totalItem = 0;
	if(!getCartItem.cart.length){
		return totalItem;
	}
	getCartItem.cart.forEach(el =>{
		totalItem += el.quantity;
	})
	return totalItem;
}
module.exports = getCountItem;