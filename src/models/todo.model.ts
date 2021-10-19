import { Model, model, Schema } from "mongoose";
import { Todo } from "./todo.interface";

const todoSchema: Schema<Todo> = new Schema<Todo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const todoModel: Model<Todo> = model<Todo>("todo", todoSchema);
