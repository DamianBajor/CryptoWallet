import { Schema, model } from "mongoose";
import { isEmail } from "validator";
import { Md5 } from "md5-typescript";
import { IUser } from "./userInterfaces";

const userSchema = new Schema<IUser>({
  userID: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "Invalid Email Address"],
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
  },
});

function autoHash(next) {
  this.password = Md5.init(this.password);
  next();
}

userSchema.pre("save", autoHash);
userSchema.pre("updateOne", autoHash);

export const UserModel = model("User", userSchema);
