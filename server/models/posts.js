const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
  username: String,
  email: String,
  imageURL: String,
  title: String
});

module.exports = mongoose.model("posts", postsSchema);
