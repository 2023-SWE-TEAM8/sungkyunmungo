const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const {
  Types: { ObjectId },
} = Schema;

const productSchema = Schema({
  writer: {
    type: ObjectId,
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
  campus:{
    type: String,
    enum: ["suwon", "hyehwa"],
    required: true,
  },
  major:{
    type: String,
    enum: ["software", "statistics"],
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
  }
});

module.exports = mongoose.model("Product", productSchema);
