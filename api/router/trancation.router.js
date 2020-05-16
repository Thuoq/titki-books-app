const express = require("express");

const router = express.Router();
const trancationController = require("../controller/trancation.controller");


router
	.get("/trancation",trancationController.getTrancations);


module.exports = router;