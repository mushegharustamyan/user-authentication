import express from "express"
import { register } from "../controllers/register.js"
import { verifyEmail, verifyRegistration } from "../middlewares/user.js"
import { signIn } from "../controllers/signIn.js"

export const authRouter = express.Router()

authRouter.post("/register", verifyRegistration ,verifyEmail ,register)
authRouter.post("/signIn",signIn)