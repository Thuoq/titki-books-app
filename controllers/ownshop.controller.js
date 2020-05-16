const Books = require("../models/book.model");
const Users = require("../models/user.model");

exports.indexOwnShop = async (req,res) => {
	let storeBooks = await Books.find({idUser: req.params.id});
	let user = await Users.findById(req.params.id);
	let page = parseInt(req.query.page) || 1;
	let perPage = 9;
	let start = (page - 1 ) * perPage; 
	let end = page * perPage;
	let totalPage = Math.ceil(storeBooks.lenth / perPage)
	let books = storeBooks.slice(start,end);
	/*PADINATION*/
	res.render("shop/shop",{
		books,
		srcImg : user.avatarUrl,
		user, 
	})
}
exports.getShopCreate = async ( req,res) => {
	let user = await Users.findById(req.params.id);
	res.render("shop/createshop",{
		srcImg : user.avatarUrl,
		user, 
	})
}

exports.postShopCreate = async (req,res) => {
	const {books,detail,title} = req.body;
	let {file:{path: image}} = req;
	let newImage = image.split("\\").slice(1).join('/');
	let newBooks = Object.assign({},{
		books,
		image: newImage,
		title,
		idUser: req.params.id,
		detail
	});
	await Books.create(newBooks);
	res.redirect("/shop/" + req.params.id );
}

exports.deleteShopCreate = async (req,res) => {
	await Books.findOneAndRemove({idUser:req.params.id});
	res.redirect("/shop/" + req.params.id)
}