const express = require("express");
const path = require("path");
const router = express.Router();

const productsController = require("../controllers/admin");

// /admin/product => get
router.get("/product", productsController.getAddProduct);

// /admin/product => post
router.post("/product", productsController.postAddProduct);

module.exports = router;

// /**
// *  @swagger
// *  tags:
// *    name: admin
// *    description: 유저를 위한 API
// */
// /**
// *  @swagger
// *  paths:
// *   /admin/login:
// *     post:
// *       summary: 유저의 로그인 요청
// *       tags: [admin]
// *       requestBody:
// *         required: true
// *         content:
// *           application/json:
// *             schema:
// *                 type: object
// *                 properties:
// *                   userName:
// *                       type: string
// *                       description: 회원의 ID
// *                   password:
// *                       type: string
// *                       description: 회원의 비밀번호
// *       responses:
// *         "200":
// *           description: 로그인에 성공하였습니다.
// *           content:
// *             application/json:
// *               schema:
// *                 type: object
// *                 properties:
// *                   isSuccess:
// *                       type: boolean
// *                       description: 성공여부
// *                   message:
// *                       type: string
// *                       description: 상태 메세지
// *                   token:
// *                       type: object
// *                       description: acessToken, refreshToken반환
// *   /admin/logout:
// *     post:
// *       summary: 유저의 로그아웃 요청
// *       tags: [admin]
// *       requestBody:
// *         required: true
// *         content:
// *           application/json:
// *             schema:
// *                 type: object
// *                 properties:
// *                   userName:
// *                       type: string
// *                       description: 회원의 ID
// *                   acessToken:
// *                       type: string
// *                       description: 액세스 토큰
// *       responses:
// *         "200":
// *           description: 로그아웃에 성공하였습니다.
// *           content:
// *             application/json:
// *               schema:
// *                 type: object
// *                 properties:
// *                   isSuccess:
// *                       type: boolean
// *                       description: 성공여부
// *                   message:
// *                       type: string
// *                       description: 상태 메세지
// */
