const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Blog", blogSchema);
