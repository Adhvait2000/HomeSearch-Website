const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/auth");

// Use the express.Router class to create modular,
// mountable route handlers.
// A Router instance is a complete middleware and routing system; for this reason.
const router = express.Router();

const { protect } = require("../middleware/auth");


router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// protected route because contains information about registered users
router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
