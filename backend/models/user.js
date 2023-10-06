const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("User", userSchema);
