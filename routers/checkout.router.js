const express = require("express");

const router = express.Router();
const checkOutController = require("../controllers/checkout.controller");
const middlewareBooks = require("../middlewares/book.middleware");

router
	.get("/",
		middlewareBooks.verifyCheckOutPage,
		checkOutController.indexCheckOutPage)
router
	.get("/:id/increase",checkOutController.increaseBook)
router
	.get("/:id/decrease",checkOutController.decreaseBook)

router
	.get("/:id/delete",checkOutController.deleteBook)
router
	.get("/rent",
		middlewareBooks.verifyCheckOutPage,
		checkOutController.rentCheckOutSucces)
module.exports = router;