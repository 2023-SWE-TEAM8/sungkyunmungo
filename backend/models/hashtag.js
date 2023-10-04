const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const {
  Types: { ObjectId },
} = Schema;

const hashTagSchema = new Schema({
  product: {
    type: ObjectId,
    required: true,
    ref: "Product",
  },
  hashtag: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("HashTag", hashTagSchema);
