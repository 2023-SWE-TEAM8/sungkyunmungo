const express = require("express");
const usersController = require("../controllers/user");

const router = express.Router();

router.post("/join", usersController.postJoin);
router.post("/mail", usersController.postEmail);
router.post("/code", usersController.postCode);
router.post("/username", usersController.postUserNameCheck);
router.post("/name", usersController.postNameCheck);

module.exports = router;