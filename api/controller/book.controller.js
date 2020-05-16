const Books = require("../../models/book.model");

exports.getBooks = async (req,res) => {
	let books = await Books.find();
	res.status(200).json(books)
}