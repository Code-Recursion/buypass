const User = require("../models/UserModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

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

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    message: "User created successfully",
    token,
  });
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

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
  });
});

module.exports = { registerUser, loginUser };
