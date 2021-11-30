export interface IChat {
  chat_id: String;
  msg: String;
  sender_id: String;
  receiver_id: String;
  friendship_id: String;
  date: String;
  time: String;
  isSeen: boolean;
}

export interface Chat {
  chat_id: String;
  chats: [IChat];
}
