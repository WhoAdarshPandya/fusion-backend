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
  console.log("reached");
  const { error } = loginValidator(req.body);
  if (error) return res.status(200).json({ msg: error.details[0].message });
  const { type, email, password } = await req.body;
  console.log(type, email, password);
  if (type === "email") {
    const userData = await findUserByEmailOrUserName({
      type: "email",
      value: email,
    });
    console.log(userData);
    if (userData.success) {
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
    } else {
      res.json({ msg: "user not found try again later", success: false });
    }
  } else if (type === "user_name") {
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
              expiresIn: "5h",
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
  } else {
    return res.json({ msg: "looked for this?", success: false });
  }
};
