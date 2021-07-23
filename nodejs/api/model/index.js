const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const listImg = new Schema({
  url: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

module.exports = model("list Img", listImg);
