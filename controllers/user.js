import { sendResBody, sendResStatus } from "../helpers.js";
import { filterUsersShownData, getUserById } from "./userController.js";

// Get user own data
export const show = async (req, res) => {
  const { userId } = req;

  const user = await getUserById(userId);

  // checking if there is no user with the passed Id
  if (!user) return sendResStatus(res, 404);

  const data = filterUsersShownData(user);

  return sendResBody(res, 200, data);
};
