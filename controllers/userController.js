import { User } from "../db/Models/User.js";

// Selects user from a database by Id
export const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

// Selects use from a database by email
export const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

// Create a user with data 
export const createUser = async (data) => {
  await User.create(data);
};

// Filter shown data from entire user object 
export const filterUsersShownData = (user) => {
  const { id, firstName, lastName, email } = user;

  return { id, firstName, lastName, email };
};
