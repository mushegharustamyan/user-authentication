import { getEnv, sendResBody, sendResStatus } from "../helpers.js";
import { User } from "../db/Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return sendResStatus(res, 409, "Invalid email or password");

    const decoded = await bcrypt.compare(password, user.password);
    if (!decoded) return sendResStatus(res, 409, "Invalid email or password");

    const token = jwt.sign({ id: user.id }, getEnv("JWT_SECRET"), {
      expiresIn: 80000,
    });

    return sendResBody(res , 200 , {token})
  } catch (e) {
    console.log(e);

    sendResStatus(res, 409, "Error during authentication");
  }
};
