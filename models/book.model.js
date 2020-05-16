const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
	books: String,
	image: String,
	title: String,
	detail: String,
	idUser: mongoose.ObjectId
})
const Books = mongoose.model('Books',bookSchema,'books');

module.exports = Books;