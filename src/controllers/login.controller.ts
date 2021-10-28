import { loginValidator } from "./../utils/";
import { Request, Response, RequestHandler } from "express";

export const loginHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  if (req.body.type === "email") {
  } else {
  }
};
