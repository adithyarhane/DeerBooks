import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/paymentController.js";
import userAuth from "../middleware/userAuth.js";

const paymentRouter = express.Router();

paymentRouter
  .route("/create-razorpay-order")
  .post(userAuth, createRazorpayOrder);

paymentRouter
  .route("/verify-razorpay-payment")
  .post(userAuth, verifyRazorpayPayment);

export default paymentRouter;
