import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel
      .findById(userId)
      .select("name email isAccountVerified _id");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      userData: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
