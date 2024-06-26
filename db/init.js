import mysql2 from "mysql2";
import { getEnv } from "../helpers.js";

export const connectionInit = async () => {
    //Setting a connection parameters
  const connectionParams = {
    user: getEnv("USER"),
    host: getEnv("HOST"),
    password: getEnv("PASSWORD"),
    port: getEnv("PORT"),
  };

  // Creating connection and database
  new Promise((resolve, reject) => {
    const connection = new mysql2.createConnection(connectionParams);
    connection.query("CREATE DATABASE IF NOT EXISTS user_auth", (err, res) => {
      if (err) reject(err);

      resolve(res);
    });
  });
};
