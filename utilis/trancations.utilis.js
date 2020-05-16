const Books = require("../models/book.model");
const Users = require("../models/user.model");
const Trancations = require("../models/trancation.model");
 async function getDataTrancationsClient (arrayBook) {
	const getTrancationsOfBooks = [];
	for(let i = 0 ; i < arrayBook.length ;i++) {
		let book = await Trancations.findOne({idBook : arrayBook[i].id});
			if(book) {
				let trancationId = arrayBook[i].id;
				let newBook = Object.assign({},
					{idTrancation:trancationId},book)
				getTrancationsOfBooks.push(book)
			}
	}
	return getTrancationsOfBooks;
}
 async function getDataUsersClient (arrayClient) {
	const getUserClient = [];
	for(let i = 0 ; i < arrayClient.length ; i ++) {
		let idUser = await Users.findById(arrayClient[i].idUser.toString());
		if(idUser) {
			getUserClient.push(idUser)
		}
	}
	return getUserClient;
}
module.exports.getDataTrancationsClient = getDataTrancationsClient;
