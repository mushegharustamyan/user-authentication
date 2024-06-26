import { sendResBody, sendResStatus } from "../helpers.js";
import { filterUsersShownData, getUserById } from "./userController.js";

export const show = async (req, res) => {
  const { userId } = req;

  const user = await getUserById(userId);

  if (!user) return sendResStatus(res, 404);

  const data = filterUsersShownData(user)

  return sendResBody(res, 200, data);
};
