const mongoose = require("mongoose");


const trancationSchema = mongoose.Schema({
	idUser: mongoose.ObjectId,
	idBook: mongoose.ObjectId,
	name: String,
	isAdmin: Boolean, 
	title: String,
	detail: String,
	quantity: Number
})
const Trancations = mongoose
					.model("Trancations",
							 trancationSchema,
							 "trancations");



module.exports  = Trancations;