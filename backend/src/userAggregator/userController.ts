import { UserModel } from "./UserModel";
import * as validator from "express-validator";
import { Md5 } from "md5-typescript";
import * as uuid from "innodb-optimized-uuid";
import { IUser } from "./userInterfaces";

export const login = async (req, res, next) => {
  validator.body(req.body);
  const { email, password } = req.body;

  req.user = await UserModel.findOne(
    { email, password: Md5.init(password) },
    "userID email name -_id"
  );

  return next();
};

export const register = async (req, res, next) => {
  validator.body(req.body);
  const { email, name, password } = req.body;

  const email_exist = await UserModel.find({ email });

  if (email_exist.length) {
    return res
      .status(409)
      .json({ message: "User with that email already exists" });
  }

  const userID = uuid.generate();

  const user: IUser = {
    userID,
    email,
    name,
    password,
    permissions: ["standard"],
  };
  await new UserModel(user).save();

  req.user = userID;
  return next();
};

export const checkPermission = (role: string) => {
  return async function (req, res, next) {
    const userID = req.user;
    const user = await UserModel.findOne({ userID }, "permissions -_id");
    if (user.permissions.includes(role)) {
      return next();
    }
    return res.status(403).json({ message: "You are not authorized" });
  };
};
