import { Sequelize } from "sequelize";

// creating connection with sequelize
export const sequelize = new Sequelize("user_auth", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
