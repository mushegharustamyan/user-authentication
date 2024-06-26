import { sendResStatus, sendResBody } from "../helpers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "./userController.js";
import { getEnv } from "../helpers.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // setting a salt count and password hashing 
    const saltCount = 10;
    const hashedPassword = await bcrypt.hash(password, saltCount);

    await createUser({
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

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if(!email || !password) return sendResStatus(res, 400);

    // get user by email and check if ther is a user with given email
    const user = await getUserByEmail(email);
    if (!user) return sendResStatus(res, 409, "Invalid email or password");

    // decoding a hash password and comparing with the decoded password with given
    const decoded = await bcrypt.compare(password, user.password);
    if (!decoded) return sendResStatus(res, 409, "Invalid email or password");

    // creating a jsonweb token for authentication
    const token = jwt.sign({ id: user.id }, getEnv("JWT_SECRET"), {
      expiresIn: 80000,
    });

    return sendResBody(res, 200, { token });
  } catch (e) {
    console.log(e);

    sendResStatus(res, 409, "Error during authentication");
  }
};
