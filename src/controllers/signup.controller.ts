import { signUpValidator } from "./../utils/";
import { Request, Response, RequestHandler } from "express";
import { insertUser, findUserByEmailOrUserName } from "../db";
import { hash, hashSync } from "bcrypt";

let saltRounds = 10;

export const signUpHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { error } = signUpValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { name, user_name, profile_url, password, email } = req.body;
  const data = await findUserByEmailOrUserName({
    type: "both",
    value: { email: req.body.email, user_name: req.body.user_name },
  });
  if (data && data.count === 0) {
    let hashedPwd: string = hashSync(password, saltRounds);
    const userData = await insertUser({
      name,
      user_name,
      email,
      password: hashedPwd,
      profile_url,
      joined_at: "joined_at",
    });
    if (userData && userData.success) {
      res.status(200).json({ msg: "user signed up", success: true });
    } else {
      console.log(userData);
      res.status(400).json({ msg: "something went wrong", success: false });
    }
  } else {
    res.json({
      msg: "user with same user name or email exists",
      success: false,
    });
  }
};
