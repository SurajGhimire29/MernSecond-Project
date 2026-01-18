const express = require("express");
const {
  addProduct,
  getProduct,
  deleteProduct,
  getProducts,
  editProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleWare/isAuthentication");
const permitTo = require("../middleWare/permitTo");
const upload = require("../middleWare/multerConfig");
const catchAsync = require("../services/catchAsync");
const router = express.Router();
router
  .route("/product")
  .post(
    isAuthenticated,
    permitTo("admin"),
    upload.single("productImage"),
    addProduct
  )
  .get(getProducts),
  router
    .route("/product/:id")
    .get(catchAsync(getProduct))
    .delete(isAuthenticated, permitTo("admin"), catchAsync(deleteProduct))
    .patch(
    isAuthenticated,
    permitTo("admin"),
    upload.single("productImage"),
    editProduct
    );
module.exports = router;
