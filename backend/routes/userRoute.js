const express = require("express");
const {
  forgotPassword,
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
} = require("../controllers/userController");

const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/logout").get(logoutUser);
Router.route("/password/reset/:token").put(resetPassword)
module.exports = Router;
