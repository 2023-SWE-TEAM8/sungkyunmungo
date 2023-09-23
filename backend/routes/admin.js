const express = require('express');
const path = require('path');
const router = express.Router();

const productsController = require('../controllers/admin');


// /admin/product => get
router.get('/product',productsController.getAddProduct);

// /admin/product => post
router.post("/product",productsController.postAddProduct);

module.exports = router;
