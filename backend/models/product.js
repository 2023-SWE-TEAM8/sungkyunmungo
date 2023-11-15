const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const {
//   Types: { ObjectId },
// } = Schema;

const productSchema = Schema({
  writer: {
    type: String,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: [String],
    required: true,
  },
  condition: {
    type: String,
    enum: ["상", "중", "하"],
    required: true,
  },
  campus: {
    type: String,
    enum: ["NSC", "HSSC"],
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["판매중", "거래 완료"],
    default: "판매중",
  },
  createdDt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

/**
 * @swagger
 *     components:
 *         schemas:
 *             product:
 *                 type: object
 *                 properties:
 *                     writer:
 *                         type: string
 *                         description: 유저의 ID를 ref로 함
 *                     title:
 *                         type: string
 *                         description: 상품 판매 제목
 *                     price:
 *                         type: integer
 *                         description: 상품 가격
 *                     description:
 *                         type: string
 *                         description: 상품 설명
 *                     imgUrl:
 *                         type: string
 *                         description: 상품 사진
 *                     condition:
 *                         type: enum
 *                         description: 상품 상태(상, 중, 하)
 *                     status:
 *                         type: enum
 *                         description: 상품 판매 상태(판매중, 거래 완료)
 *                     createdAt:
 *                         type: date
 *                         description: 거래글 생성 날짜
 */
