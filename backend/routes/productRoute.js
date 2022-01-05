const express = require("express");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/Auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetailsById,
} = require("../controllers/productController");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/product/new").post(
  isAuthenticatedUser,
  authorizedRoles("admin"),
  createProduct
);

Router.route("/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
  .get(getProductDetailsById);

module.exports = Router;
