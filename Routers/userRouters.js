const express = require("express");
const UserDetail = require("../models/userdetailModel");

const router = express.Router();

// --------------- GET Routes ----------------

router.get("/", (req, res) => {
  res.render("home", {user: req.user});
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// --------------- Post Routes ----------------

router.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const token = await UserDetail.matchPasswordAndCreateToken(
    userEmail,
    userPassword
  );
  if (!token) {
    console.log("login failed");
    res.redirect("/signup");
  } else {
    console.log(token, "login succesful");
    res.cookie("token", token).redirect("/");
  }
});

router.post("/signup", async (req, res) => {
  const { userFullName, userEmail, userPassword } = req.body;
  await UserDetail.create({
    userFullName,
    userEmail,
    userPassword,
  });
  res.redirect("/login");
});

module.exports = router;
