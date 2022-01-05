const { findByIdAndUpdate } = require("../models/ProductModel");
const Product = require("../models/ProductModel");

// Get All Products
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    message: "success",
    products,
  });
};

//Get a Single Product
const getProductDetailsById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }

  await Product.findById(req.params.id);

  return res.status(200).json({
    success: true,
    message: "product details found",
    product,
  });
};

// Create a Product -- ADMIN
const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// Update a Product -- ADMIN
const updateProduct = async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
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
};

// Delete Product
const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  await Product.findByIdAndRemove(req.params.id).catch((err) => {
    console.log("failed to delete", err);
  });
  return res.status(200).json({
    success: true,
    message: "product deleted successfully",
    product,
  });
};

module.exports = {
  getAllProducts,
  getProductDetailsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
