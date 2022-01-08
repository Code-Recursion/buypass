const { isAuthenticatedUser, authorizedRoles } = require("../middleware/Auth");
const express = require("express");
const Router = express.Router();
const {
  newOrder,
  getMyOrders,
  getOrderDetailsById,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

Router.route("/order/new").post(isAuthenticatedUser, newOrder);
Router.route("/order/:id").get(isAuthenticatedUser, getOrderDetailsById);
Router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
Router.route("/admin/orders").get(
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getAllOrders
);
Router.route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = Router;
