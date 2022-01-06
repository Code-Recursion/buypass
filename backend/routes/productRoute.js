const express = require("express");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/Auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetailsById,
  createProductReview,
} = require("../controllers/productController");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/admin/product/new").post(
  isAuthenticatedUser,
  authorizedRoles("admin"),
  createProduct
);
Router.route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);
Router.route("/product/:id").get(getProductDetailsById);
Router.route("/product/review").put(isAuthenticatedUser, createProductReview);
module.exports = Router;
