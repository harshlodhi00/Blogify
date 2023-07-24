const express = require("express");
const UserDetail = require("../models/userdetailModel");

const router = express.Router();

// --------------- GET Routes ----------------

router.get("/", (req, res) => {
  return res.render("home", { user: req.user });
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
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

module.exports = router;
