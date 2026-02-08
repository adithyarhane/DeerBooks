import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.route("/data").get(userAuth, getCart);
cartRouter.route("/add").post(userAuth, addToCart);
cartRouter.route("/update/:bookId").patch(userAuth, updateCartItemQuantity);
cartRouter.route("/remove/:bookId").delete(userAuth, removeFromCart);
cartRouter.route("/clear").delete(userAuth, clearCart);

export default cartRouter;
