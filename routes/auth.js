import express from "express";
import { register } from "../controllers/auth.js";
import {
  validatePassword,
  verifyEmail,
  verifyRegistration,
} from "../middlewares/user.js";
import { signIn } from "../controllers/auth.js";

export const authRouter = express.Router();

// Registration rout
authRouter.post(
  "/register",
  verifyRegistration,
  verifyEmail,
  validatePassword,
  register
);

// Sign in Rout
authRouter.post("/signIn", signIn);
