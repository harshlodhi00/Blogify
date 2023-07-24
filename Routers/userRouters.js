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

    // Login successful, set the token in the cookie and redirect to the home page
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    // Handle login errors and pass the error message to the template
    return res.render("login", { error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  const { userFullName, userEmail, userPassword } = req.body;

  try {
    const existingUser = await UserDetail.findOne({ userEmail });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered!" });
    }
    await UserDetail.create({
      userFullName,
      userEmail,
      userPassword,
    });
    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    return res.render("signup", { error: "An error occurred during signup!" });
  }
});

module.exports = router;
