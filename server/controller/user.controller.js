import { UserModel } from "../model/user.model.js";

export const Me = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(404).json({ message: "Invalid User_id" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User data", user: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during Getting user" });
  }
};

export const AllUsers = async (req, res) => {
  try {
    const userId = req.user.userId;
    const filterUSer = await UserModel.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    return res.status(200).json({ allUsers: filterUSer });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during Getting user" });
  }
};
