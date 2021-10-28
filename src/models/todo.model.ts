import { Model, model, Schema } from "mongoose";
import { Todo } from "./todo.interface";

const todoSchema: Schema<Todo> = new Schema<Todo>({
  todo_id: { type: String, required: true },
  todos: { type: Array, required: true },
});

export const todoModel: Model<Todo> = model<Todo>("todo", todoSchema);
