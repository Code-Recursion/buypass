const express = require("express");
const {
  forgotPassword,
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getAllUsers,
  getUserDetails,
  updatePassword,
  updateProfile,
  getUserDetailsAdmin,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/Auth");

const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/logout").get(logoutUser);
Router.route("/password/reset/:token").put(resetPassword);
Router.route("/me").get(isAuthenticatedUser, getUserDetails);
Router.route("/admin/users").get(
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getAllUsers
);
Router.route("/password/update").put(isAuthenticatedUser, updatePassword);
Router.route("/me/update").put(isAuthenticatedUser, updateProfile);
Router.route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetailsAdmin)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = Router;
