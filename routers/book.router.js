const express = require("express");
const router  = express.Router();
const bookController  = require("../controllers/book.controller");
router.get('/',bookController.indexBook)

router.get('/create',bookController.bookCreate)

router.post('/create',bookController.bookCreatePost)

router.get('/:id/delete',bookController.bookDelete)

router.get("/:id/edit",bookController.bookEdit)

router.post("/:id/edit",bookController.bookEditPost)

router.get("/add/:id",bookController.countItemToCart)

router.post("/",bookController.searchBook)

module.exports = router;