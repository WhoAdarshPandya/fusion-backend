import { Model, model, Schema } from "mongoose";
import { FriendList } from "./friendlist.interface";

const FriendListSchema: Schema<FriendList> = new Schema<FriendList>({
  friend_id: { type: String, required: true },
  friends: {
    type: [
      {
        user_id: String,
        friendship_id: String,
        date: String,
        time: String,
      },
    ],
    required: true,
    default: [],
  },
});

export const friendListModel: Model<FriendList> = model<FriendList>(
  "friendlist",
  FriendListSchema
);
