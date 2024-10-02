import { UserModel } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { GenToken } from "../utils/genToken.js";

export const SignUp = async (req, res) => {
  const { fullName, userName, gender, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ userName });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already existed with this user name" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${userName}`
        : `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new UserModel({
      fullName,
      userName,
      gender,
      password: hashPassword,
      profilePic,
    });

    await newUser.save();

    const token = GenToken(newUser._id);

    return res
      .status(201)
      .json({ message: "User Signup successfully", token: token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error during sign up" });
  }
};

export const LogIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const token = GenToken(user._id);

    return res
      .status(200)
      .json({ message: "User Logged in successfully", token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during Login" });
  }
};
