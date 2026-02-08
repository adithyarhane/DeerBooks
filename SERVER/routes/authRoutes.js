import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  resetPassword,
  sendResetOtp,
  sendVerificationOtp,
  signup,
  verifyAccount,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.route("/is-auth").get(userAuth, isAuthenticated);
authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);
authRouter.route("/send-verification-otp").post(userAuth, sendVerificationOtp);
authRouter.route("/verify-account").post(userAuth, verifyAccount);
authRouter.route("/send-reset-otp").post(sendResetOtp);
authRouter.route("/reset-password").post(resetPassword);
authRouter.route("/logout").post(logout);

export default authRouter;
