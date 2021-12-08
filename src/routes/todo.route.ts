import { Router } from "express";
import {
  getTodosController,
  addTodoController,
  deleteTodoController,
  updateTodoController,
} from "../controllers";

export const todoRouter = Router();

todoRouter.get("/gettodos/:id", getTodosController);

todoRouter.post("/addtodo", addTodoController);

todoRouter.get("/deletetodo/:todo_master_id/:todo_id", deleteTodoController);

todoRouter.post("/updatetodo", updateTodoController);
