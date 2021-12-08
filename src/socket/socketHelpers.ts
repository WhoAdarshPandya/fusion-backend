import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { insertRequest, insertFriend, insertChat } from "../db";
import { v4 } from "uuid";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

export const sendReqEvent = async (
  token: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  id: string,
  req_for_id: string,
  req_id: string,
  user_profile: string,
  username: string,
  name: string,
  req_by_id: string
): Promise<void> => {
  // experimental
  try {
    verify(token, process.env.SECRET_TOKEN!);
    const data = await insertRequest({
      id,
      req_by_id,
      req_id,
      req_for_id,
      name,
      date: "f",
      time: "",
      username,
      user_profile,
    });
    if (data.success) {
      io.emit(`new_req${req_for_id}`, {
        msg: `${name} sent you friend request`,
      });
    }
  } catch (err) {
    io.emit(`new_req${req_for_id}`, {
      msg: "error in storing new data, invalid token!",
    });
  }
  // experimental
};

export const acceptedReqEvent = async (
  token: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  frinal_friend_id: string,
  f_user_id: string,
  friendship_id: string,
  date: string,
  time: string,
  f_name: string,
  f_user_name: string,
  f_user_profile: string,
  user_id: string
): Promise<void> => {
  try {
    verify(token, process.env.SECRET_TOKEN!);
    const data = await insertFriend({
      id: frinal_friend_id,
      user_id: f_user_id,
      user_name: f_user_name,
      user_profile: f_user_profile,
      date,
      time,
      friendship_id,
      name: f_name,
    });
    if (data.success) {
      console.log(data);
      io.emit(`accepted${user_id}`, {
        msg: `${f_name} accepted your friend request`,
      });
    }
  } catch (error) {
    io.emit(`accepted${user_id}`, {
      msg: `error in storing new data, invalid token!`,
    });
  }
};

export const updateFriends = async (
  token: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
): Promise<void> => {
  try {
    verify(token, process.env.SECRET_TOKEN!);
    io.emit("updateFriends", {});
  } catch (error) {
    io.emit("updateFriends", {});
  }
};

export const newMsgEvent = async (
  token: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  chat_id: string,
  another_chat_id: string,
  msg: string,
  sender_id: string,
  receiver_id: string,
  friendship_id: string,
  date: string,
  time: string,
  anonymousMode: boolean,
  name: string
): Promise<void> => {
  try {
    verify(token, process.env.SECRET_TOKEN!);
    if (!anonymousMode) {
      await insertChat({
        id: chat_id,
        chat_id: v4(),
        date,
        time,
        friendship_id,
        msg,
        receiver_id,
        sender_id,
      });
      await insertChat({
        id: another_chat_id,
        chat_id: v4(),
        date,
        time,
        friendship_id,
        msg,
        receiver_id,
        sender_id,
      });
    }
    io.emit(`loadChat${sender_id}`, { updateChat: true, error: false });
    io.emit(`new_incoming_msg${receiver_id}`, {
      chat_id,
      sender_id,
      msg,
      friendship_id,
      error: false,
      name,
    });
  } catch (error) {
    io.emit(`loadChat${sender_id}`, { updateChat: false, error: true });
    io.emit(`new_incoming_msg${receiver_id}`, {
      chat_id,
      sender_id,
      msg: "chat cannot take unauthorized requests,invalid token",
      friendship_id,
      error: false,
    });
  }
};
