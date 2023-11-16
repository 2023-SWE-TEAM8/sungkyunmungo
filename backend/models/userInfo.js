const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const {
  Types: { ObjectId },
} = Schema;

const userInfoSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  major: {
    type: String,
  },
  campus: {
    type: String,
    enum: ["자연과학캠퍼스", "인문사회과학캠퍼스"],
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
});

module.exports = mongoose.model("UserInfo", userInfoSchema);
