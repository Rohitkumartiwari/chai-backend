import express from "express";
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware.js";
import {
  registration,
  getUserList,
  login,
  changePassword,
  loggedUser,
} from "../controllers/UserController.js";
router.use("/changePassword", checkAuth);
router.use("/userData", checkAuth);
router.post("/changePassword", changePassword);
router.post("/register", registration);
router.post("/login", login);
router.get("/persons", getUserList);
router.get("/userData", loggedUser);
export default router;
