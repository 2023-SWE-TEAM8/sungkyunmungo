const express = require('express');
const path = require('path');
const productsController = require('../controllers/board');

const router = express.Router();


// /board/product => get
router.get("/product",productsController.getAddBoard)

module.exports = router;