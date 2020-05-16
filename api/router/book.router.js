const express = require("express");

const bookController = require("../controller/book.controller");
const router = express.Router();


router 
	.get("/books",bookController.getBooks)


module.exports = router;