import {
  getAllUserData,
  deleteUser,
  updatePassword,
  updateUserNotification,
  updateUserDND,
  updateUserInfo,
  updateUserProfile,
  findUserByEmailOrUserName,
} from "./../db/";
import { Request, Response, RequestHandler } from "express";
import { compareSync, hashSync } from "bcrypt";

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
  const { id, email, old_pass, new_pass } = req.body;
  const datata = await findUserByEmailOrUserName({
    type: "email",
    value: email,
  });
  if (datata.success && datata.count > 0) {
    const db_pass = datata.res[0].password;
    const db_decrypted_pass = compareSync(old_pass, db_pass);
    if (db_decrypted_pass) {
      let new_pass_enc = hashSync(new_pass, 10);
      const data = await updatePassword(id, new_pass_enc);
      return res.json({ data });
    } else {
      return res.json({ success: false, msg: "password not updated" });
    }
  } else {
    return res.json({ success: false, msg: "no user found" });
  }
  // const data = await updatePassword(id, password);
  // console.log(data);
  // return res.json({ datata });
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
