const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create New Order
const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "order placed successfully",
    order,
  });
});

// Get Order Details By Id
const getOrderDetailsById = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // using user get name and email
  if (!order) {
    return next(
      new ErrorHandler(
        `Order details not found with the id ${req.params.id}`,
        400
      )
    );
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user's order
const getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    order,
  });
});

// Get All order
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// update Order Status -- ADMIN // after delivery of order decrement the stock amount
const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this Id ${req.params.id}`, 404)
    );
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This order is already delivered", 400));
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
});

const updateStock = async (productId, productQuantity) => {
  const product = await Product.findById(productId);
  product.stock -= productQuantity;

  await product.save({ validateBeforeSave: true });
};

// Delte order -- Admin
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  newOrder,
  getOrderDetailsById,
  getMyOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
