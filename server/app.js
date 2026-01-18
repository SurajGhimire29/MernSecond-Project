require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/connectDB");

const  FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"
// ROUTES
const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
const adminUserRoute = require("./routes/adminUserRoutes");
const reviewRoutes = require("./routes/productReviewRoutes");
const profileRoute = require("./routes/profileRoutes");
const cartRoute = require("./routes/cartRoutes");


// CREATE APP
const app = express();
const PORT = process.env.PORT || 5000;

// CONNECT DB

// ✅ CORS MUST COME BEFORE ROUTES
app.use(
  cors({
    origin: "http://localhost:5173",
  origin:FRONTEND_URL,
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
app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running!",
  });
});
// START SERVER
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server has started at PORT ${PORT}`);
      console.log(`Health check available at /healthz`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });