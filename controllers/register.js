import { User } from "../db/Models/User.js";
import { sendResStatus } from "../helpers.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const saltCount = 10;
    const hashedPassword = await bcrypt.hash(password, saltCount);

    await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return sendResStatus(res, 201);
  } catch (e) {
    console.log(e);

    sendResStatus(res, 500, "Error during registration");
  }
};
