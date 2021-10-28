import { Model, model, Schema } from "mongoose";
import { User } from "./user.interface";

const userSchema: Schema<User> = new Schema<User>({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  user_name: { type: String, required: true },
  email: { type: String, required: true },
  friend_id: { type: String, required: true },
  chat_id: { type: String, required: true },
  todo_id: { type: String, required: true },
  request_id: { type: String, required: true },
  theme: { type: String, required: true },
  password: { type: String, required: true },
  profile_url: { type: String, required: true },
  joined_at: { type: String, required: true },
  dnd: { type: Boolean, required: true },
  notification: { type: Boolean, required: true },
});

export const userModel: Model<User> = model<User>("user", userSchema);
