const getCountItem = require("../utilis/book.utilis");
const Trancations = require("../models/trancation.model");
const Users = require("../models/user.model");
const Books = require("../models/book.model");
const {getDataTrancationsClient}  = require("../utilis/trancations.utilis");
exports.indexTrancation  = async (req,res) => {
	try{
		const user = await Users.findById(req.signedCookies.userId);
		let totalItem = await getCountItem(req)
		if(!user.isAdmin) {
			let trancationUser = await Trancations.find({name: user.name});
			let bookUser = await Books.find({idUser: req.signedCookies.userId })
			let getTrancationClient = await getDataTrancationsClient(bookUser);
			if(!getTrancationClient.length){
				res.render("trancations/trancation",{
					trancations: trancationUser,
					srcImg: user.avatarUrl,
					number: totalItem,
					user
				})
				return;
			}
			else {
				if(getTrancationClient[0].name !== user.name) {
					res.render("trancations/trancation",{
						trancations: trancationUser,
						srcImg: user.avatarUrl,
						number: totalItem,
						user,
						trancationBrrowUsers: getTrancationClient
					})
					return;	
				}else{
				res.render("trancations/trancation",{
					trancations: trancationUser,
					srcImg: user.avatarUrl,
					number: totalItem,
					user
				})
					return;
				}
			}
		}else{
			let trancationUser = await Trancations.find()
			res.render("trancations/trancation",{
				trancations:  trancationUser,
				srcImg: user.avatarUrl,
				number: totalItem,
				admin : user.isAdmin,
				user,
			})
		}
	}catch(err) {
		console.log(err)
	}
	
}

exports.trancationCreate = async(req,res) => {
	const user = await Users.findById(req.signedCookies.userId);
	const users = await Users.find();
	const books = await Books.find();
	res.render("trancations/createTrancation",{
		users,
		books,
		user,
		srcImg: user.avatarUrl
	})
}

exports.trancationCreatePost = async (req,res) => {
	let {user,book} = {...req.body};
	let userExits = await Users.findOne({name: user})
	let bookExits = await Books.findOne({title:book})
	let newTrancation = Object.assign({},{
		idBook: bookExits.id,
		idUser: userExits.id,
		name: userExits.name,
		isAdmin: userExits.isAdmin,
		title: bookExits.title,
		detail: bookExits.detail,
	});
	await Trancations.create(newTrancation);
	res.redirect("/trancation");
}

exports.transcactionCompelete = async (req,res) => {
	await Trancations.findByIdAndRemove(req.params.id);
	res.redirect("/trancation")
}