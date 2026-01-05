require("dotenv").config();
const { model } = require("mongoose");
const { connectDatabase } = require("./database/connectDB");
const express = require("express");
const User = require("./model/userModel");
const Product = require("./model/productModel");
const app = express();
const adminUserRoute = require("./routes/adminUserRoutes");
connectDatabase();
const bcrypt = require("bcryptjs");
const port = process.env.PORT;
app.use(express.json());
app.use(express.static("uploads"))
app.use(express.urlencoded({ extended: true }));
const authRoute = require("./routes/authRoutes")
const productRoute = require("./routes/productRoutes")
app.use("",authRoute)
app.use("",productRoute)
app.use("",adminUserRoute)



//CREATE USER API

app.listen(port, (req, res) => {
  console.log(`Connected to ${port}`);
});
