import { Document } from "mongoose";
import { User, userModel } from "../models";
import { v4 } from "uuid";

export const findUserByEmailOrUserName = async (data: any) => {
  let result: any = { res: [], success: false };
  if (data.type === "email") {
    await userModel.find({ email: data.value }, (err, res) => {
      if (err) {
        result = { err, success: false };
      } else {
        result = { res, success: true, count: res.length };
      }
    });
  } else if (data.type === "user_name") {
    await userModel.find({ user_name: data.value }, (err, res) => {
      if (err) {
        result = { err, success: false };
      } else {
        result = { res, success: true, count: res.length };
      }
    });
  } else {
    await userModel.find(
      {
        $or: [{ email: data.value.email }, { user_name: data.value.user_name }],
      },
      (err, res) => {
        if (err) {
          result = { err, success: false };
        } else {
          result = { res, success: true, count: res.length };
        }
      }
    );
  }
  return result;
};

export const insertUser = async (data: {
  name: string;
  user_name: string;
  email: string;
  password: string;
  profile_url: string;
  joined_at: string;
}) => {
  const user: Document<User> = new userModel({
    user_id: v4(),
    name: data.name,
    user_name: data.user_name,
    email: data.email,
    friend_id: v4(),
    chat_id: v4(),
    todo_id: v4(),
    request_id: v4(),
    theme: "orange",
    password: data.password,
    profile_url: data.profile_url,
    joined_at: data.joined_at,
    dnd: false,
    notification: true,
  });
  const resp = await user
    .save()
    .then((res) => ({ msg: "inserted", success: true, res }))
    .catch((err) => ({ msg: "inserted", success: false, err }));
  return resp;
};
