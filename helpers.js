import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";

// Function gets an enviroment variable with given key
export const getEnv = (key) => {
  return process.env[`${key}`];
};

// Configuring router for authentication and show function
export const configureRouter = (app) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
};

// Sends a resposne with given status code and message
export const sendResStatus = (res, status, message = "") => {
  if (message === "") {
    switch (status) {
      case 200:
        message = "Success";
        break;
      case 201:
        message = "Record created";
        break;
      case 202:
        message = "Waiting for approval";
        break;
      case 204:
        message = "Record deleted";
        break;
      case 400:
        message = "Missing required fileds";
        break;
      case 401:
        message = "Unauthorized";
        break;
      case 403:
        message = "Access denied";
        break;
      case 404:
        message = "Record not found";
        break;
      case 409:
        message = "Record already exists";
        break;
      case 500:
        message = "Internal server error";
        break;
      default:
        message = "Unknown error";
    }
  }

  res.statusMessage = message;
  return res.status(status).send();
};

// Sends a response with given statis code and body
export const sendResBody = (res, status = 200, body = {}) => {
  res.statusMessage = "success";
  return res.status(status).json(body);
};
