import { User } from "../db/Models/User.js";
import { sendResStatus } from "../helpers.js";

export const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) return sendResStatus(res, 409, "Email is already in use");

    next();
  } catch (e) {
    console.log(e);

    sendResStatus(res, 500);
  }
};

export const verifyRegistration = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    return sendResStatus(res, 400);

  next();
};

export const verifyUser = async (req, res, next) => {
  const { id } = req.query;
};
