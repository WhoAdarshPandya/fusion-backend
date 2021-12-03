import { deleteFriend, getAllFriends, insertFriend } from "../db/";
import { RequestHandler, Request, Response } from "express";

export const deleteFriendController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { friend_master_id, friend_id } = req.params;
  const data = await deleteFriend(friend_master_id, friend_id);
  console.log(data);
  return res.json({ data });
};

export const getFriendsController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = await getAllFriends(id);
  console.log(data);
  return res.json({ data });
};

export const addFriendController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {
    id,
    user_id,
    friendship_id,
    date,
    time,
    name,
    user_name,
    user_profile,
  } = req.body;
  console.log(id, user_id, friendship_id);
  const data = await insertFriend({
    id,
    friendship_id,
    user_id,
    date: date,
    time: time,
    name,
    user_name,
    user_profile,
  });
  console.log(data);
  return res.json({ data });
};
