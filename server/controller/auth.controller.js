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

    const newUser = new UserModel({
      fullName,
      userName,
      gender,
      password: hashPassword,
    });

    await newUser.save();

    const token = GenToken(newUser._id);

    return res
      .status(201)
      .json({ message: "User Signup successfully", token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during sign up" });
  }
};