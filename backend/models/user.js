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
  verification: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
