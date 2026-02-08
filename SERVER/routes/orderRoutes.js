import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  createOrderFromCart,
  getOrderById,
  getOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter
  .route("/create-order-from-cart")
  .post(userAuth, createOrderFromCart);
orderRouter.route("/data").get(userAuth, getOrders);
orderRouter.route("/:orderId").get(userAuth, getOrderById);

export default orderRouter;
