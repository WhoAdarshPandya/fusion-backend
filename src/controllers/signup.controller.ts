import { signUpValidator } from "./../utils/";
import { Request, Response, RequestHandler } from "express";

export const signUpHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { error } = signUpValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
};
