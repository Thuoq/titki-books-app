const express = require("express");

const router = express.Router();
const controllerSignIn = require("../controller/signin.controller");

router
		.post("/signin",controllerSignIn.signInApiPost)


module.exports = router