import { Model, model, Schema } from "mongoose";
import { Chat } from "./chat.interface";

const ChatSchema: Schema<Chat> = new Schema<Chat>({
  chat_id: { type: String, required: true },
  chats: {
    type: [
      {
        chat_id: String,
        msg: String,
        sender_id: String,
        receiver_id: String,
        friendship_id: String,
        date: String,
        time: String,
        isSeen: Boolean
      },
    ],
    required: true,
    default: [],
  },
});

export const chatModel: Model<Chat> = model<Chat>("chat", ChatSchema);
