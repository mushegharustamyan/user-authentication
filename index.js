import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { configureRouter, getEnv } from "./helpers.js";
import { connectionInit } from "./db/init.js";
import { sequelize } from "./db/sequelize.js";

const app = express();
app.use(express.json());
configureRouter(app);

const port = getEnv("SERVER_PORT");

app.listen(port, async () => {
  console.log("listen 5000");
  try {
    await connectionInit();
    await sequelize.sync({ alter: false, force: false });
  } catch (e) {
    console.log(e);
  }
});
