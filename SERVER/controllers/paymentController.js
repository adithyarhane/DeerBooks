import cartModel from "../models/CartModel.js";
import orderModel from "../models/orderModel.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment data",
      });
    }

    // 0. fetch cart
    const cart = await cartModel.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty.",
      });
    }

    // 1. Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    // 2. find order using orderId
    const order = await orderModel.findOne({
      user: userId,
      orderId: orderId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.payment.status === "success") {
      return res.json({
        success: true,
        message: "Already verified",
      });
    }

    // 3. update order
    order.payment.status = "success";
    order.status = "paid";
    await order.save();

    // 4. clear cart
    cart.items = [];
    cart.summary = {
      totalItems: 0,
      totalQuantity: 0,
      subtotal: 0,
      discount: 0,
      totalPayable: 0,
    };

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Payment verification successfull.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
