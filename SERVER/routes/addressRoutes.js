import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  addAddress,
  getAddresses,
  updateAddress,
} from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.route("/add").post(userAuth, addAddress);
addressRouter.route("/data").get(userAuth, getAddresses);
addressRouter.route("/update/:addressId").patch(userAuth, updateAddress);

export default addressRouter;
