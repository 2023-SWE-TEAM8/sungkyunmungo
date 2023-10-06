const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model("UserInfo", userInfoSchema);
