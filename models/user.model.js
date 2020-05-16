const mongoose = require("mongoose");


const userSchema =  new mongoose.Schema({
	name: {
		type: String,
		required: [true,'A user must name ']
	},
	password: {
		type: String,
		required: [true,'A user must password']
	},
	email: {
		type: String,
		required: [true,'A user must  email']
	},
	isAdmin: Number,
	isPassword: Number,
	avatarUrl: {
		type: String,
		default: "http://res.cloudinary.com/cownut/image/upload/v1589649822/bcmbmhvlzhngqjwzyrdq.jpg"
	},
	avatarPath : {
		type: String
	}
})

const Users = mongoose.model("Users",userSchema,"users");

module.exports = Users