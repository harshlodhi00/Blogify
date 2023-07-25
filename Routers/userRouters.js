const express = require("express");
const UserDetail = require("../models/userdetailModel");
const blogs = require("../models/blogsModel");

const router = express.Router();

// --------------- GET Routes ----------------

router.get("/", async (req, res) => {
  const allBlogs = await blogs.find({});
  console.log(allBlogs);
  return res.render("home", { user: req.user, allBlogs: allBlogs });
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/addBlog", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
});

router.get("/tendingBlog", async (req, res) => {
  const allBlogs = await blogs.find({});
  return res.render("tendingBlog", { user: req.user, allBlogs: allBlogs });
});

router.get("/yourBlogs", async (req, res) => {
  try {
    const allBlogs = await blogs.find({});
    return res.render("yourBlogs", { user: req.user, allBlogs: allBlogs });
  } catch (error) {
    return res.status(500).render("/", { error: "Error fetching blogs" });
  }
});

// --------------- Post Routes ----------------

router.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const token = await UserDetail.matchPasswordAndCreateToken(
      userEmail,
      userPassword
    );
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.locals.error = error.message;
    return res.render("login");
  }
});

router.post("/signup", async (req, res) => {
  const { userFullName, userEmail, userPassword } = req.body;

  try {
    const existingUser = await UserDetail.findOne({ userEmail });
    if (existingUser) {
      res.locals.error = "Email already registered!";
      return res.render("signup");
    }
    await UserDetail.create({
      userFullName,
      userEmail,
      userPassword,
    });
    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.locals.error = "An error occurred during signup!";
    return res.render("signup");
  }
});

router.post("/addBlog", async (req, res) => {
  if (!req.user) {
    res.locals.error = "You need to signin first";
    return res.render("addBlog");
  }

  const { blogTitle, blogBody } = req.body;
  const userEmail = req.user.userEmail;
  const blogAuthor = req.user.userFullName;

  if (blogTitle === "" || blogBody === "") {
    res.locals.error = "You can't post empty Blog";
    return res.render("addBlog");
  }
  await blogs.create({
    blogTitle,
    blogBody,
    blogAuthor,
    userEmail,
  });
  return res.render("addBlog", { user: req.user });
});

module.exports = router;
