const Users = require("../../models/user.model");

exports.signInApiPost =  (req,res) => {
	let newUser = req.body;
	res.status(200).json(newUser)
}