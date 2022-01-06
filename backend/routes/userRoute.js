const express = require("express");
const {
  forgotPassword,
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getAllUsers,
  getUserDetails,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/Auth");

const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/logout").get(logoutUser);
Router.route("/password/reset/:token").put(resetPassword);
Router.route("/me").get(isAuthenticatedUser, getUserDetails);
Router.route("users").get(
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getAllUsers
);
module.exports = Router;
