require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/connectDB");

// ROUTES
const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
const adminUserRoute = require("./routes/adminUserRoutes");
const reviewRoutes = require("./routes/productReviewRoutes");
const profileRoute = require("./routes/profileRoutes");
const cartRoute = require("./routes/cartRoutes");

// CREATE APP
const app = express();
const port = process.env.PORT || 3000;

// CONNECT DB
connectDatabase();

// ✅ CORS MUST COME BEFORE ROUTES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC FILES (IMAGES)


// ROUTES (WITH API PREFIX)
app.use("/api", authRoute);
app.use("/api", productRoute);
app.use("/api", adminUserRoute);
app.use("/api", reviewRoutes);
app.use("/api", profileRoute);
app.use("/api", cartRoute);

app.use(express.static("uploads"))
// START SERVER
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
