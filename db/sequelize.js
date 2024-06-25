import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("user_auth", "root", "", {
  hots: "localhost",
  dialect: "mysql",
});

