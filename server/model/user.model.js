import mongoose, { Schema } from "mongoose";
import { GENDER } from "../config/enums.js";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true, enum: Object.values(GENDER) },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
