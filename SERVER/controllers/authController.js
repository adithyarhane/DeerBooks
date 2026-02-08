import sendEmail from "../config/nodemailer.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import generateOtp from "../utils/GenerateOtp.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing details.",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id);

    // Send welcome email
    const subject = "Welcome to DeerBooks ✨";
    const message = `✨ Welcome to DeerBooks Website. Your account has been created with id: ${email}`;

    sendEmail(email, subject, message);

    return res.status(200).json({
      success: true,
      user: { user },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "email and password required.",
    });
  }

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Password.",
      });
    }

    generateTokenAndSetCookie(res, user._id);

    return res.json({
      success: true,
      user: { user },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const sendVerificationOtp = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.findOne({ _id: userId });

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account already verified.",
      });
    }

    const otp = generateOtp();
    user.verificationOtp = otp;
    user.verificationOtpExpireAt = Date.now() + 1 * 60 * 60 * 1000;

    await user.save();

    const email = user.email;
    const subject = "🗝️ Account Verification OTP";
    const message = `Your OTP is ${otp}. Verify your account using this OTP.`;

    sendEmail(email, subject, message);

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent on your email.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyAccount = async (req, res) => {
  const userId = req.user.id;
  const { otp } = req.body;
  try {
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "🔍 User not found.",
      });
    }

    if (user.verificationOtp === "" || user.verificationOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "⚠️ Invalid OTP. Please try again.",
      });
    }

    if (user.verificationOtpExpireAt < Date.now()) {
      return res.status(410).json({
        success: false,
        message: "⚠️ OTP Expired.",
      });
    }

    user.isAccountVerified = true;
    user.verificationOtp = "";
    user.verificationOtpExpireAt = "";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "✅ Email verified successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required.",
    });
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }

    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const subject = "🗝️ Password reset OTP.";
    const message = `OTP for resetting your password ${otp} Use this OTP to process with resetting your password.`;

    // Send an email using async/await
    sendEmail(user.email, subject, message);

    return res.status(200).json({
      success: true,
      message: "✅ Reset OTP sent to your email.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, Otp and new password is required.",
    });
  }

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP Expired.",
      });
    }

    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "Password is too weak.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = "";

    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged Out.",
    });
  } catch (error) {
    return req.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
