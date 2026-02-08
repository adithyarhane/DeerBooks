import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import Razorpay from "razorpay";
import paymentRouter from "./routes/paymentRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173"];

// middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());

// RAZORPAY INSTANCE
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Root API Endpoints
app.use("/api/v1/deerbooks/auth", authRouter);
app.use("/api/v1/deerbooks/user", userRouter);
app.use("/api/v1/deerbooks/book", bookRouter);
app.use("/api/v1/deerbooks/user/wishlist", wishlistRouter);
app.use("/api/v1/deerbooks/user/cart", cartRouter);
app.use("/api/v1/deerbooks/user/address", addressRouter);
app.use("/api/v1/deerbooks/user/order", orderRouter);
app.use("/api/v1/deerbooks/user/payment/razorpay", paymentRouter);
app.use("/api/v1/deerbooks/book/user/review", reviewRouter);

// Start start from here
app.listen(PORT, () => {
  console.log(`Server running on port:  ${PORT} ------------>`);
});
