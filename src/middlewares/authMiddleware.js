import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const { iserID } = jwt.verify(
        authorization.split(" ")[1],
        process.env.SECRET_KEY
      );

      req.user = await UserModel.findById(iserID).select("-password");
      next();
    } catch (error) {
      console.log("error", error);
    }
  }
};
export default checkAuth;
