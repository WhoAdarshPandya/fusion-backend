import { loginValidator } from "./../utils/";
import { Request, Response, RequestHandler } from "express";
import { findUserByEmailOrUserName } from "../db";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const loginHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { type, password } = req.body;
  if (type === "email") {
    const userData = await findUserByEmailOrUserName({
      type: "email",
      value: req.body.email,
    });
    if (userData && userData.success) {
      if (userData.count > 0) {
        let pwd = userData.res[0].password;
        let isValid = compareSync(password, pwd);
        if (isValid) {
          const token = jwt.sign(
            { user: userData.res[0] },
            process.env.SECRET_TOKEN!,
            {
              expiresIn: "2h",
            }
          );
          return res.cookie("token", token).json({
            msg: "log in successful",
            success: true,
            token,
            userData: userData.res[0],
          });
        } else {
          res.json({ msg: "unsuccessful login attempt", success: false });
        }
      } else {
        res.json({ msg: "no user found", success: false });
      }
    }
  }

  if (type === "user_name") {
    const userData = await findUserByEmailOrUserName({
      type: "user_name",
      value: req.body.user_name,
    });
    if (userData && userData.success) {
      if (userData.count > 0) {
        let pwd = userData.res[0].password;
        let isValid = compareSync(password, pwd);
        if (isValid) {
          const token = jwt.sign(
            { user: userData.res[0] },
            process.env.SECRET_TOKEN!,
            {
              expiresIn: "2h",
            }
          );
          return res.json({
            msg: "log in successful",
            success: true,
            token,
            userData: userData.res[0],
          });
        } else {
          return res.json({
            msg: "unsuccessful login attempt",
            success: false,
          });
        }
      } else {
        return res.json({ msg: "no user found", success: false });
      }
    }
  }
};
