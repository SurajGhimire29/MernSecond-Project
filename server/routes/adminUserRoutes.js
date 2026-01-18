const express = require("express");

const permitTo = require("../middleWare/permitTo");
const isAuthenticated = require("../middleWare/isAuthentication");

const {
  getUsers,
  deleteUser,
} = require("../controller/admin/user/userContrroller");

const router = express.Router();

//routes here

router.route("/users").get(isAuthenticated, permitTo("admin"), getUsers);
router.route("/users/:id").get(isAuthenticated, permitTo("admin"), deleteUser);

module.exports = router;