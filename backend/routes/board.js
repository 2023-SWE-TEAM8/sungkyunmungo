const express = require('express');
const productsController = require('../controllers/board');
const router = express.Router();


// /board/product => get
// router.get("/product",productsController.getAddBoard);

// 전체 post 하는 함수
router.get("/postAll",productsController.postBoardAll);

// page 별로 post 하는 함수
//http://localhost:8000/board/posts?page=10&limit=10
router.get("/posts",productsController.postBoardPage);

// 데이터 입력하는 함수
router.post("/posts/write", productsController.postBoard)

module.exports = router;
