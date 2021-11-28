import { Router } from "express";
import {
  getChatsController,
  addChatController,
  deleteChatController,
} from "../controllers";

export const chatRouter = Router();

chatRouter.get("/getchats/:id", getChatsController);

chatRouter.post("/addchat", addChatController);

chatRouter.get("/deletechat/:chat_master_id/:chat_id", deleteChatController);
