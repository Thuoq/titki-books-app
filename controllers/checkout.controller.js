const db = require("../db");
const getCountItem = require("../utilis/book.utilis");
const {getBookCheckOut} = require("../utilis/checkout.utilis");
const Users = require("../models/user.model");
const Trancations = require("../models/trancation.model");
const Books = require("../models/book.model");
const Sessions = require("../models/session.model");
exports.indexCheckOutPage = async (req,res) => {
	const {userId} = req.signedCookies;
	let {avatarUrl} = await Users.findById(userId);
	const {cart}  = await getBookCheckOut(req);
	const totalItem = await getCountItem(req);
	res.render("checkout/checkout",{
		number : totalItem,
		srcImg : avatarUrl,
		books : cart,
	})	
} 
exports.rentCheckOutSucces = async (req,res) => {
	const {userId,sessionId} = req.signedCookies;
	const {cart,storeTitle} = await getBookCheckOut(req);
	const {name,isAdmin} = await Users.findById(userId);

	for(let i = 0 ; i < storeTitle.length ; i++) {
		if(Books.findOne({title: storeTitle[i]})) {
			let book = await Books.findOne({title: storeTitle[i]});
			let newTrancation = Object.assign({}, {name: name,
													idUser: userId,
													idBook :book.id, 
													isAdmin,
													quantity: cart[i].quantity,
													title: book.title,
													detail: book.detail
													});
			await Trancations.create(newTrancation);
		} 
	}
	await Sessions.findByIdAndUpdate(sessionId,{cart: []},{new: true})
	res.redirect("/trancation")
}

exports.increaseBook = async (req,res) => {
	const {sessionId} = req.signedCookies;
	const idBook = req.params.id;
	let {cart} = await Sessions.findById(sessionId);
	cart.map(el => el.idBook.toString() === idBook ? el.quantity += 1 : el)
	await Sessions.findByIdAndUpdate(sessionId,
		{cart : cart},
		{new: true});
	res.redirect("/checkout")
}
exports.decreaseBook = async (req,res) => {
	const {sessionId} = req.signedCookies;
	const idBook = req.params.id;
	let {cart} = await Sessions.findById(sessionId);
	const exitsCart = cart.find(el => el.idBook.toString() === idBook);
	if(exitsCart.quantity === 1) {
		cart = cart.filter(el => el.idBook.toString() !== idBook);
		await Sessions.findByIdAndUpdate(sessionId,
		{cart : cart},
		{new: true});
		res.redirect("/checkout")
		return;
	}
	cart.map(el => el.idBook.toString() === idBook ? el.quantity -= 1 : el)
	await Sessions.findByIdAndUpdate(sessionId,
		{cart : cart},
		{new: true});
	res.redirect("/checkout")
}

exports.deleteBook = async (req,res) => {
	const {sessionId} = req.signedCookies;
	const idBook = req.params.id;
	let {cart} = await Sessions.findById(sessionId);
	const exitsBook = cart.find( el => el.idBook.toString() === idBook);
	if(exitsBook){
		cart = cart.filter(el => el.idBook.toString() !== idBook)
	}
	await Sessions.findByIdAndUpdate(sessionId,
		{cart : cart},
		{new: true});
	res.redirect("/checkout")

}