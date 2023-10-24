const express = require("express");
const usersController = require("../controllers/user");

const router = express.Router();

router.post("/join", usersController.postJoin);

module.exports = router;
