const express = require('express');
const productsController = require('../controllers/board');
const router = express.Router();

/**
 *  @swagger
 *  tags:
 *    name: Boards
 *    description: 게시글 관련 API
 */

// /board/product => get
// router.get("/product",productsController.getAddBoard);

// 전체 post 하는 함수
router.get("/postAll", productsController.postBoardAll);

// page 별로 post 하는 함수
//http://localhost:8000/board/posts?page=10&limit=10
router.get("/posts", productsController.postBoardPage);
/**
 * @swagger
 * /board/posts:
 *   get:
 *    summary: "게시글 조회"
 *    parameters:
 *      - in: query
 *        name: page
 *        type: integer
 *        required: true
 *        description: 페이지 수
 *      - in: query
 *        name: limit
 *        type: integer
 *        required: true
 *        description: 한 페이지에 보여주는 최대 게시글 수
 *    description: "게시글 조회"
 *    tags: [Boards]
 *    responses:
 *      "200":
 *        description: 게시글 조회 완료.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                isSuccess:
 *                  type: boolean
 *                message:
 *                  type: string
 *                data:
 *                  type: object
 *                currentPage:
 *                  type: integer
 *                maxPage:
 *                  type: integer
 *                limit:
 *                  type: integer
 */


// 데이터 입력하는 함수
router.post("/posts/write", productsController.postBoard)
/**
 * @swagger
 * /board/posts/write:
 *   post:
 *    summary: "게시글 업로드"
 *    description: "게시글 업로드 요청"
 *    tags: [Boards]
 *    requestBody:
 *      description: 게시글 업로드 필요 요소
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              writer:
 *                type: string
 *                description: "작성자명"
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              price:
 *                type: number
 *                description: "가격"
 *              description:
 *                type: string
 *                description: "게시글 설명"
 *              imageUrl:
 *                type: [string]
 *                example: ["imgurl1", "imgurl2", "imgurl3"]
 *                description: "S3 버킷에 업로드한 이미지 url"
 *              campus:
 *                type: string
 *                description: "소속 캠퍼스"
 *              major:
 *                type: string
 *                description: "전공"
 *              condition:
 *                type: string
 *                description: "상품 상태"
 *              status:
 *                type: string
 *                description: "판매중 or 거래완료"
 *    responses:
 *      "200":
 *        description: 게시글 업로드 완료.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: number
 *                isSuccess:
 *                  type: boolean
 *                message:
 *                  type: string
 *                data:
 *                  type: object
 */
router.get("/posts/search", productsController.searchProduct) //검색하는 함수

//드롭다운용 전공 조회
router.get("/majors", productsController.getAllMajor);
/**
 * @swagger
 * /board/majors:
 *   get:
 *    summary: "드롭다운용 전공 조회"
 *    description: "드롭다운용 전공 조회"
 *    tags: [Boards]
 *    responses:
 *      "200":
 *        description: 드롭다운용 전공 조회 완료.
 *        content:
 *          application/json:
 *           schema:
 *              example: ["math", "english", "software"]
 */


module.exports = router;
