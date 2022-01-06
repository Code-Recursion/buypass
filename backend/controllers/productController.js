// const { findByIdAndUpdate } = require("../models/ProductModel");
const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Get All Products
const getAllProducts = catchAsyncErrors(async (req, res) => {
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
const getProductDetailsById = catchAsyncErrors(async (req, res, next) => {
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
const createProduct = catchAsyncErrors(async (req, res, next) => {
  // adding user who created the product
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Update a Product -- ADMIN
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).catch((err) => {
    console.log("err while updating", err);
  });

  return res.status(200).json({
    success: true,
    message: "product updated successfully",
    product,
  });
});

// Delete Product -- ADMIN
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
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

// Create New Review / Update Review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() == req.user._id
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() == req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let averageRating = 0;

  product.reviews.forEach((rev) => {
    averageRating += rev.rating;
  });

  product.ratings = averageRating / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "rating added successfully",
  });
});

module.exports = {
  getAllProducts,
  getProductDetailsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
