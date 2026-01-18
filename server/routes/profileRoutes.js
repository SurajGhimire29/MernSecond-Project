const {
  getMyProfile,
} = require("../controller/admin/user/profile/profileController");
const isAuthenticated = require("../middleWare/isAuthentication");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();
router.route("/profile").get(isAuthenticated, catchAsync(getMyProfile));
module.exports = router;
