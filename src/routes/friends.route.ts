import { Router } from "express";
import {
  addFriendController,
  deleteFriendController,
  getFriendsController,
} from "../controllers";

export const friendsRouter = Router();

friendsRouter.get("/getfriends/:id", getFriendsController);

friendsRouter.post("/addfriend", addFriendController);

friendsRouter.get(
  "/deletefriend/:friend_master_id/:friend_id",
  deleteFriendController
);
