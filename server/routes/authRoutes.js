const express = require("express");
const { userRegister, userLogin, forgotPassword, verifyOtp, resetPassword } = require("../controller/authController/authController");
const Review = require("../model/reviewModel");
const router = express.Router();
router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/forgotPassword").post(forgotPassword)
router.route("/verifyotp").post(verifyOtp)
router.route("/Newpassword").post(resetPassword)

module.exports = router;