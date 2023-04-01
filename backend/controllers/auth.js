const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const crypto = require("crypto");

// @desc    Register User
// @route   POST /homesearch/v1/auth/register
// @access  PUBLIC

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body; // you have to pass in these parameters in the request to register user

  // Create user using User Model
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create token
  sendTokenResponse(user, 200, res);
});

// @desc    Login User
// @route   POST /homesearch/v1/auth/login
// @access  PUBLIC

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body; // you have to pass in these parameters in the request to login

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  // If for some reason you need to get the password(any field)
  // but need to have select: false in the schema. use select('+password etc')
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401)); //401: unauthorised
  }

  // Check if password matches (if user exists in DB)
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401)); //401: unauthorised
  }

  // Create token
  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /homesearch/v1/auth/logout
// @access  PRIVATE

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get current logged in user
// @route   GET /homesearch/v1/auth/me
// @access  PRIVATE

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Forget password
// @route   GET /homesearch/v1/auth/forgotpassword
// @access  PUBLIC

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  // validateBeforeSave: true -> documents are automatically validated before they are saved to the database.
  // This is to prevent saving an invalid document.
  // validateBeforeSave: false -> If you want to handle validation manually, and be able to save objects
  // which don't pass validation.
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/homesearch/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requesteed the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({
      success: true,
      data: "Email sent",
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined; // setting the field to null (because resetEmail has to be resent)
    user.resetPasswordExpire = undefined; // setting the field to null (because resetEmail has to be resent)

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }

  console.log(resetToken);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Reset password
// @route   PUT /homesearch/v1/auth/resetpassword/:resettoken
// @access  PUBLIC

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined; // setting the field to null (because password has been reset)
  user.resetPasswordExpire = undefined; // setting the field to null (because password has been reset)
  await user.save();

  sendTokenResponse(user, 200, res);
});

// [Helper Function] Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Allow for secure flag to be turned on for cookie when in production env
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token
  });
};
