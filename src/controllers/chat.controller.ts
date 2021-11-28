import { deleteChat, getAllChats, insertChat } from "../db/";
import { RequestHandler, Request, Response } from "express";

export const deleteChatController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { chat_master_id, chat_id } = req.params;
  const data = await deleteChat(chat_master_id, chat_id);
  console.log(data);
  return res.json({ data });
};

export const getChatsController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  console.log(id);
  const data = await getAllChats(id);
  console.log(data);
  return res.json({ data });
};

export const addChatController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id, chat_id } = req.body;
  const data = await insertChat({
    id,
    chat_id,
    date: "a",
    friendship_id: "b",
    msg: "hi",
    receiver_id: "D",
    sender_id: "E",
    time: "5:09",
  });
  console.log(data);
  return res.json({ data });
};
