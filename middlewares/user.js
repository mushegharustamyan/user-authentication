import { getUserByEmail} from "../controllers/userController.js";
import { getEnv, sendResStatus } from "../helpers.js";
import jwt from "jsonwebtoken";

// The middleware checks if there is a user with the same email
export const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (user) return sendResStatus(res, 409, "Email is already in use");

    next();
  } catch (e) {
    console.log(e);

    sendResStatus(res, 500);
  }
};

// The middleware check if all data passed from user for registration
export const verifyRegistration = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    return sendResStatus(res, 400);

  next();
};

// The middleware validates a password for registration
export const validatePassword = (req, res, next) => {
  const errorMessage =
    "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.";

  const { password } = req.body;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasDigit || hasSpecialChar)
    return sendResStatus(res, 400, errorMessage);
};

// The middleware checks if token is valid
export const verifyToken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) return sendResStatus(res, 401);

  const decoded = jwt.verify(token, getEnv("JWT_SECRET"));

  if (!decoded) return sendResStatus(res, 403, "Invalid token");

  if (decoded) {
    req.userId = decoded.id;

    next();
  }
};
