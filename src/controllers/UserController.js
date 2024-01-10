import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
  path: "./env",
});
const saltRounds = 10;
const hashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};
export const registration = async (req, res) => {
  const { name, email, password, cnfPassword } = req.body;
  const user = await UserModel.findOne({
    email: email,
  });
  if (user) {
    res.send({ status: "failed", message: "user already exist" });
  } else {
    if (name && email && password && cnfPassword) {
      if (password == cnfPassword) {
        try {
          const hashedPassword = await hashPassword(password);
          const doc = new UserModel({
            name,
            email,

            password: hashedPassword,
          });
          await doc.save();
          const saved_user = await UserModel.findOne({ email });
          const token = jwt.sign(
            { iserID: saved_user._id },
            process.env.SECRET_KEY,
            {
              expiresIn: "5d",
            }
          );
          res.send({
            status: "success",
            message: "register successfuly",
            token: token,
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      res.send({ status: "failed", message: "all fields required" });
    }
  }
};
export const getUserList = async (req, res) => {
  const AllUser = await UserModel.find();
  res.status(200).json(AllUser);
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ iserID: user._id }, process.env.SECRET_KEY, {
          expiresIn: "5d",
        });
        res.status(200).send({
          status: "success",
          message: "user login successfully",
          token: token,
        });
      } else {
        res.send("enter valid email and password");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(201).send("You are not registered user");
  }
};
export const changePassword = async (req, res) => {
  const { password, cnfPassword } = req.body;
  if (password && cnfPassword) {
    if (password !== cnfPassword) {
      res.send({
        status: "failed",
        messgage: "password and confirm password are not same",
      });
    } else {
      try {
        const hashedPassword = await hashPassword(password);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: hashedPassword },
        });
        res.status(200).send("password change successfully");
      } catch (error) {
        console.log("error", error);
      }
    }
  } else {
    res.status(501).send("Every field is required");
  }
};
export const loggedUser = async (req, res) => {
  res.send({ user: req.user });
};
