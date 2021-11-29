import {
  getAllUserData,
  deleteUser,
  updatePassword,
  updateUserNotification,
  updateUserDND,
  updateUserInfo,
  updateUserProfile,
} from "./../db/";
import { Request, Response, RequestHandler } from "express";

export const userController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = await getAllUserData(id);
  console.log(data);
  return res.json({ data });
};

export const deleteUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = await deleteUser(id);
  console.log(data);
  return res.json({ data });
};

export const updateUserPasswordController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id, password } = req.body;
  const data = await updatePassword(id, password);
  console.log(data);
  return res.json({ data });
};

export const updateUserNotificationController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id, notification } = req.body;
  const data = await updateUserNotification(id, notification);
  console.log(data);
  return res.json({ data });
};

export const updateUserDndController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id, dnd } = req.body;
  const data = await updateUserDND(id, dnd);
  console.log(data);
  return res.json({ data });
};

export const updateUserProfileController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id, url } = req.body;
  const data = await updateUserProfile(id, url);
  console.log(data);
  return res.json({ data });
};

export const updateUserInfoController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id, name, user_name, theme, email } = req.body;
  const data = await updateUserInfo(id, name, user_name, theme, email);
  console.log(data);
  return res.json({ data });
};
