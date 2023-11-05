const express = require("express");
const usersController = require("../controllers/user");
const { auth } = require("../authMiddleware");

const router = express.Router();

/**
 *  @swagger
 *  tags:
 *    name: Users
 *    description: 유저를 위한 API
 */

router.post("/join", usersController.postJoin);
/**
 * @swagger
 * /user/join:
 *   post:
 *    summary: "회원 가입 요청"
 *    description: "회원 가입을 통한 사용자 정보 저장"
 *    tags: [Users]
 *    requestBody:
 *      description: 유저 정보
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userName:
 *                type: string
 *                description: "유저 고유아이디"
 *              name:
 *                type: string
 *                description: "유저 이름"
 *              passWord:
 *                type: string
 *                description: "패스 워드"
 *              phone:
 *                type: string
 *                description: "전화 번호"
 *              email:
 *                type: string
 *                description: "이메일"
 *              studentId:
 *                type: string
 *                description: "학번"
 *              major:
 *                type: string
 *                description: "전공"
 *              campus:
 *                type: string
 *                description: "캠퍼스"
 *    responses:
 *      "200":
 *        description: 회원가입에 성공하였습니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isSuccess:
 *                  type: boolean
 *                message:
 *                  type: string
 */
router.post("/mail", usersController.postEmail);
/**
 * @swagger
 * /user/mail:
 *   post:
 *    summary: "코드 전송 요청"
 *    description: "유저 메일에 코드 전송 요청"
 *    tags: [Users]
 *    requestBody:
 *      description: 이메일
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: "이메일"
 *
 *    responses:
 *      "200":
 *        description: 발송 완료.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isSuccess:
 *                  type: boolean
 *                message:
 *                  type: string
 */
router.post("/code", usersController.postCode);
/**
 * @swagger
 * /user/code:
 *   post:
 *    summary: "코드 확인 요청"
 *    description: "전송된 코드 확인"
 *    tags: [Users]
 *    requestBody:
 *      description: 6자리 응답 코드
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                description: "응답 코드 6자리"
 *
 *    responses:
 *      "200":
 *        description: 발송 완료.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isSuccess:
 *                  type: boolean
 *                message:
 *                  type: string
 */
router.post("/username", usersController.postUserNameCheck);
/**
 * @swagger
 * /user/username:
 *   post:
 *    summary: "아이디 중복 확인"
 *    description: "아이디 중복 확인"
 *    tags: [Users]
 *    requestBody:
 *      description: 사용할 아이디
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userName:
 *                type: string
 *                description: "사용할 아이디"
 *
 *    responses:
 *      "200":
 *        description: 발송 완료.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isSuccess:
 *                  type: boolean
 *                message:
 *                  type: string
 */
router.post("/name", usersController.postNameCheck);
/**
 * @swagger
 * /user/name:
 *   post:
 *    summary: "닉네임 중복 확인"
 *    description: "사용할 닉네임 중복 확인"
 *    tags: [Users]
 *    requestBody:
 *      description: 사용할 닉네임
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "사용할 닉네임"
 *
 *    responses:
 *      "200":
 *        description: 발송 완료.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isSuccess:
 *                  type: boolean
 *                message:
 *                  type: string
 */
router.post("/login", usersController.postLogin);
/**
 * @swagger
 * /user/login:
 *   post:
 *    summary: "유저 로그인 요청"
 *    description: "로그인 요청"
 *    tags: [Users]
 *    requestBody:
 *      description: 아이디 및 패스워드
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userName:
 *                type: string
 *                description: "아이디"
 *              passWord:
 *                type: string
 *                description: "비밀번호"
 *
 *    responses:
 *      "200":
 *        description: 발송 완료.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isSuccess:
 *                  type: boolean
 *                message:
 *                  type: string
 */
router.post("/logout", auth, usersController.postLogout);
/**
 * @swagger
 * /user/logout:
 *   post:
 *    summary: "유저 로그아웃 요청"
 *    description: "로그아웃"
 *    tags: [Users]
 *    requestBody:
 *      description: 아이디
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userName:
 *                type: string
 *                description: "아이디"
 *
 *    responses:
 *      "200":
 *        description: 발송 완료.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isSuccess:
 *                  type: boolean
 *                message:
 *                  type: string
 */

module.exports = router;
