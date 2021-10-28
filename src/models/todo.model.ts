import { Model, model, Schema } from "mongoose";
import { Todo } from "./todo.interface";

const todoSchema: Schema<Todo> = new Schema<Todo>({
  todo_id: { type: String, required: true },
  todos: {
    type: [
      {
        id: String,
        title: String,
        description: String,
        date: String,
        time: String,
        isStarred: Boolean,
        color: String,
      },
    ],
    required: true,
    default: [],
  },
});

export const todoModel: Model<Todo> = model<Todo>("todo", todoSchema);
