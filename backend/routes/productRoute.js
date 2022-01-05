const express = require("express");
const { isAuthenticatedUser } = require("../middleware/Auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetailsById,
} = require("../controllers/productController");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/product/new").post(isAuthenticatedUser, createProduct);
Router.route("/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .get(getProductDetailsById);

module.exports = Router;
