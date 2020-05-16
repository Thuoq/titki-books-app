const multer  = require('multer')
const upload = multer({dest: './public/uploads/'})

const express = require("express");
const router  = express.Router();
const trancationsController = require("../controllers/transcaction.controller");
const middlewareUser = require("../middlewares/auth.middleware");

router
	.get("/",
		trancationsController.indexTrancation)

router
	.get("/create",
		middlewareUser.isAdmin,
		trancationsController.trancationCreate)
	
router
	.post("/create",
		trancationsController.trancationCreatePost)

router.get("/:id/compelete",trancationsController.transcactionCompelete)



module.exports = router;