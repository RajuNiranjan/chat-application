import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { GenerateToken } from "../config/generateToken.js";

export const Register = async (req, res) => {
  try {
    const { userName, fullName, password, gender } = req.body;

    const existingUser = await UserModel.findOne({ userName });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already existed with user name" });
    }

    if (!userName || !fullName || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const profilePic =
      gender === "Male"
        ? `https://avatar.iran.liara.run/public/boy?username=${userName}`
        : `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new UserModel({
      userName,
      fullName,
      password: hashPassword,
      gender,
      profilePic,
    });

    await newUser.save();

    const token = GenerateToken(newUser._id);
    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during register", error: error });
  }
};

export const LogIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = GenerateToken(user._id);
    return res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during login", error: error });
  }
};
