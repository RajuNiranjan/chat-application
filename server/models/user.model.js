import mongoose, { Schema } from "mongoose";
import { GENDER } from "../utils/enum.js";

const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true, enum: GENDER },
    profilePic: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
