const express = require("express");
const path = require("path");
var cookieParser = require('cookie-parser')

const app = express();

const router = require("./Routers/userRouters");
const connectDB = require("./connection");
const checkForAuthenticationCookie = require("./middlewares/cookieAuthentication");

const PORT = 8000;

connectDB('mongodb://localhost:27017/blogify');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))

// app.use(express.)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Application Server Is Started at http://localhost${PORT}`);
});
