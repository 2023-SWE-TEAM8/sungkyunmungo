const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  passWord: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  studentId: {
    type: String,
  },
  rate: {
    type: Number,
    default: 0,
  },
  numEvaluators: {
    type: Number,
    default: 0,
  },
  totalTrade: {
    type: Number,
    default: 0,
  },
  keyWord: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  code: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);


// 위의 스키마 구조는 예시로 적어놓으신거 같아서 slack애 올라온 DB구조 기반으로 스웨거 스키마 정보 작성 해놓았습니다.

/** 
* @swagger
*     components:
*         schemas:
*             user:
*                 type: object
*                 properties:
*                     id:
*                         type: string
*                         description: 유저의 ID
*                     password:
*                         type: string
*                         description: 유저의 비밀번호
*                     name:
*                         type: string
*                         description: 유저의 이름
*                     phone:
*                         type: string
*                         description: 유저의 전화번호
*                     email:
*                         type: string
*                         description: 유저의 이메일
*                     rate:
*                         type: integer
*                         description: 유저 평가 점수
*                     totalTrade:
*                         type: integer
*                         description: 총 거래 횟수
*                     numEvaluators:
*                         type: integer
*                         description: 
*                     keyword:
*                         type: string
*                         description: 유저 등록 키워드
*                     date:
*                         type: date
*                         description: 가입 일자
*/
