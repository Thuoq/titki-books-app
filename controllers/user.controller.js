const bcrypt = require('bcrypt');
const Users = require("../models/user.model");
const saltRounds = 10;
const Books = require("../models/book.model");
exports.indexUser = async (req,res) => {
	let currentUsers = await Users.find();
	let user = await Users.findById(req.signedCookies.userId)
	res.render("users/users",{
		users : currentUsers,
		srcImg : user.avatarUrl,
		user,
	}) 
}
exports.userCreate =(req,res) => {
	res.render("users/createUser")
}
exports.userCreatePost = async (req,res) => {	
	let query = {...req.body};
	await bcrypt.hash(query.password, saltRounds, async function(err, hash) {
		query.password = hash;
   	 	let newUser = Object.assign({},query,{isAdmin:false,isPassword:0});
		await Users.create(newUser);
		res.redirect("/users");
	});
}
exports.userUptoAdmin = async (req,res ) => {
	await Users.findByIdAndUpdate(req.params.id,{isAdmin: true});
	res.redirect("/users")
}

exports.userDelete = async (req,res) => {
	await Users.findByIdAndRemove(req.params.id);
	res.redirect("/users")
}
