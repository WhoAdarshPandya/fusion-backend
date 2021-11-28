import { getAllUserData, deleteUser } from "./../db/";
import { Request, Response, RequestHandler } from "express";

export const userController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = await getAllUserData(id);
  console.log(data);
  res.json({ data });
};

export const deleteUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = await deleteUser(id);
  console.log(data);
  res.json({ data });
};
