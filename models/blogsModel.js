const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    blogAuthor: {
      type: String,
      require: true,
    },
    userEmail: {
      type: String,
      require: true,
    },
    blogTitle: {
      type: String,
      require: true,
      unique: true,
    },
    blogBody: {
      type: String,
      require: true,
    },
    blogImgURL: {
      type: String,
      default: "/images/user_default.avif",
    },
    blogLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const blogs = model("blogs", blogSchema);

module.exports = blogs;
