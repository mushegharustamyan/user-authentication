import mysql2 from "mysql2";
import { getEnv } from "../helpers.js";
import {User} from "./Models/User.js";

export const connectionInit = async () => {
  const connectionParams = {
    user: getEnv("USER"),
    host: getEnv("HOST"),
    password: getEnv("PASSWORD"),
    port: getEnv("PORT"),
  };

  console.log(connectionParams);

  new Promise((resolve, reject) => {
    const connection = new mysql2.createConnection(connectionParams);
    connection.query("CREATE DATABASE IF NOT EXISTS user_auth", (err, res) => {
      if (err) reject(err);

      resolve(res);
    });
  });
};