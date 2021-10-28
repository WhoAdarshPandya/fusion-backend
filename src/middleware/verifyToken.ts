import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

declare global {
  namespace Express {
    interface Request {
      user: {};
    }
  }
}

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ msg: "access denied", success: false });
  try {
    const userData = jwt.verify(token, process.env.SECRET_TOKEN!);
    req.user = userData;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ msg: "token expired | something went wrong", success: false });
  }
};
