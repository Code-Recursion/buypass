const User = require("../models/UserModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const generateToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a User
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "1234_id",
      url: "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png",
    },
  });

  generateToken(user, "registered", 201, res);
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // authenticating user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = user.getJWTToken();

  generateToken(user, "logged in", 200, res);
});

// Logout User

const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Forgot Password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword
  const resetToken = await user.getResetPasswordToken();

  console.log("reset Token", resetToken);
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this kindly ignore this or report this to admin`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Reset`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  generateToken(user, "Password reset done", 200, res);
});

// Get All Users -- ADMIN
const getAllUsers = catchAsyncErrors(async (req, res) => {
  const usersCount = await Product.count();
  const users = await User.find();

  res.status(200).json({
    message: "success",
    users,
    usersCount,
  });
});

// Get User Details by ID
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "User details found",
    user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  logoutUser,
  resetPassword,
  getAllUsers,
  getUserDetails,
};
