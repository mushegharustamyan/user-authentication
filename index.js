import express from "express";
import dotenv from "dotenv";
import { connectionInit } from "./db/init.js";
import { sequelize } from "./db/sequelize.js";
import { configureRouter } from "./helpers.js";

dotenv.config();
const app = express();
app.use(express.json());
configureRouter(app);

app.listen(5000, async () => {
  console.log("listen 5000");
  try {
    await connectionInit();
    await sequelize.sync({ alter: false, force: false });
  } catch (e) {
    console.log(e);
  }
});
