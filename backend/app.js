const express = require("express");
const connectDB = require("./src/database/signup.database");
const User = require("./src/model/signup.user")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const { userAuth } = require("./src/middleware/auth")

const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
const adminRoutes = require("./src/routes/admin");
const app = express();
const cors = require("cors");
const busPassRouter = require("./src/routes/busPass");
const paymentRouter = require("./src/routes/payment");
const razorpay = require("razorpay");

const chatRouter = require("./src/routes/chat");

const admintokenRoutes = require('./src/routes/admin_routes');
// const llmRouter = require("./src/routes/llm");

// Load environment variables
require("dotenv").config();

// Load FRONTEND_URL from config
const { FRONTEND_URL } = require("./config");

console.log("DEBUG: FRONTEND_URL : ", FRONTEND_URL)

// CORS Configuration
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", adminRoutes);
app.use("/", busPassRouter);
app.use("/", paymentRouter);

app.use("/", admintokenRoutes);

app.use("/", chatRouter);

connectDB()
  .then(async () => {
    console.log("connection sucessfull");
    
    // Clean up old indexes from previous schema
    try {
      const db = mongoose.connection.db;
      if (db) {
        const collection = db.collection("buspasses");
        try {
          await collection.dropIndex("srNo_1");
          console.log("✓ Cleaned up old srNo_1 index");
        } catch (e) {
          // Index doesn't exist, that's fine
        }
        try {
          await collection.dropIndex("regNo_1");
          console.log("✓ Cleaned up old regNo_1 index");
        } catch (e) {
          // Index doesn't exist, that's fine
        }
      }
    } catch (error) {
      console.warn("Warning: Could not clean up indexes:", error.message);
    }
    
    app.listen(process.env.PORT, () => {
      console.log("port listen at 3000");
    });
  })
  .catch((err) => {
    console.error("Connection Failed: ", err);
  });
