const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({dest: './public/uploads/'})
const controller = require("../controllers/auth.controller");
const middlewareUser = require("../middlewares/auth.middleware");
router
	.get("/",
		controller.authSignIn
)
	
router
	.post("/",
		middlewareUser.verifyUser,
		controller.authSignInSuceess
)	
router
	.get("/signout",
		controller.authSignOut
)
router
	.post("/signup",
		upload.single('avatar'),
		middlewareUser.verifyUserSignUp,
		controller.authSignInSuceess)

router
	.get("/signup",controller.authSignUp)
	
module.exports =  router;