const express = require("express");

const router = express.Router();
const multer  = require('multer')
const upload = multer({dest: './public/bookImage/'})

const ownShopController = require("../controllers/ownshop.controller");

router
	.get("/:id",ownShopController.indexOwnShop);
router
	.get("/:id/create",ownShopController.getShopCreate);

router
	.post("/:id/create",upload.single('image'),
		ownShopController.postShopCreate);
router
	.get("/:id/delete",ownShopController.deleteShopCreate)
module.exports = router;