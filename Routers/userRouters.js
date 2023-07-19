const express = require("express");
const UserDetail = require('../models/userdetailModel')

const router = express.Router();

// --------------- GET Routes ----------------

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// --------------- Post Routes ----------------

router.post("/login", (req, res) => {
  const { userEnteredEmail, userEnteredPassword } = req.body;
  // console.log(userEnteredEmail, userEnteredPassword)



  
  res.redirect('/')
});

router.post("/signup", async (req, res) => {
  const { userFullName, userEmail, userPassword } = req.body;
  await UserDetail.create({
    userFullName,
    userEmail,
    userPassword
  })
  res.redirect('/login');

});

module.exports = router;
