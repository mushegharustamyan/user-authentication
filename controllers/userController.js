import { User } from "../db/Models/User.js";

export const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

export const createUser = async (data) => {
  await User.create(data);
};

export const filterUsersShownData = (user) => {
  const { id, firstName, lastName, email } = user;

  return { id, firstName, lastName, email };
};
