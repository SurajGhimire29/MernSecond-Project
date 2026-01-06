const express = require("express");
const router = express.Router();
const catchAsync = require("../services/catchAsync");

const isAuthenticated = require("../middleWare/isAuthentication");
const {
  createReview,
  getProductReview,
  deleteReview,
} = require("../controller/admin/user/review/reviewController");

router.route("/review/:id").post(isAuthenticated, catchAsync(createReview))
router.route("/singleget/:id").get(isAuthenticated,catchAsync(getProductReview))
router.route("/reviewDelete/:id").delete(isAuthenticated, catchAsync(deleteReview))

module.exports = router;
