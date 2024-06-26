import express from "express";
import { register } from "../controllers/auth.js";
import {
  validatePassword,
  verifyEmail,
  verifyRegistration,
} from "../middlewares/user.js";
import { signIn } from "../controllers/auth.js";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  verifyRegistration,
  verifyEmail,
  validatePassword,
  register
);
authRouter.post("/signIn", signIn);
