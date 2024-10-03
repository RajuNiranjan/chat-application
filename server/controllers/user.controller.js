import { UserModel } from "../models/user.model.js";

export const Me = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = user.toObject();
    delete userResponse.password;
    return res.status(200).json({ user: userResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error during getting the user",
      error: error,
    });
  }
};
