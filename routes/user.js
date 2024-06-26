import express from "express";
import { show } from "../controllers/user.js";
import { verifyToken } from "../middlewares/user.js";

export const userRouter = express.Router();

userRouter.get("/show", verifyToken, show);
