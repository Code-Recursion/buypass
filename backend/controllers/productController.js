// const { findByIdAndUpdate } = require("../models/ProductModel");
const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Get All Products
const getAllProducts = CatchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productsCount = await Product.count();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    message: "success",
    products,
    productsCount,
  });
});

// Get a Single Product
const getProductDetailsById = CatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findById(req.params.id);

  return res.status(200).json({
    success: true,
    message: "product details found",
    product,
  });
});

// Create a Product -- ADMIN
const createProduct = CatchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Update a Product -- ADMIN
const updateProduct = CatchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).catch((err) => {
    console.log("err while updaing", err);
  });

  return res.status(200).json({
    success: true,
    message: "product updated successfully",
    product,
  });
});

// Delete Product -- ADMIN
const deleteProduct = CatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await Product.findByIdAndRemove(req.params.id).catch((err) => {
    console.log("failed to delete", err);
  });
  return res.status(200).json({
    success: true,
    message: "product deleted successfully",
    product,
  });
});

module.exports = {
  getAllProducts,
  getProductDetailsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
