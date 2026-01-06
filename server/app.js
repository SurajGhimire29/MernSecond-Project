require("dotenv").config();
const express = require("express");
const { connectDatabase } = require("./database/connectDB");

// ROUTES (only require, do NOT use yet)
const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
const adminUserRoute = require("./routes/adminUserRoutes");
const reviewRoutes = require("./routes/productReviewRoutes");
const { getMyProfile } = require("./controller/admin/user/profile/profileController");

// CREATE APP FIRST ✅
const app = express();
const port = process.env.PORT;

// CONNECT DB
connectDatabase();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// ROUTES (use AFTER app is created)
app.use("", authRoute);
app.use("", productRoute);
app.use("", adminUserRoute);
app.use("", reviewRoutes);
app.use("",getMyProfile);

// START SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

