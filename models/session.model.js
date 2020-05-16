const mongoose = require("mongoose");


const sessionSchema = mongoose.Schema({
	cart: [
		{
			idBook: mongoose.ObjectId,
			books: String,
			title: String,
			quantity: Number,
			name: String,
			detail: String,
			image: String
		}
	]
})


const Sessions = mongoose.model("Sessions", sessionSchema,"sessions")

module.exports = Sessions;