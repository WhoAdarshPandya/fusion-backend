import { Router } from "express";
import {
  getTodosController,
  addTodoController,
  deleteTodoController,
} from "../controllers";

export const todoRouter = Router();

todoRouter.get("/gettodos/:id", getTodosController);

todoRouter.post("/addtodo", addTodoController);

todoRouter.get("/deletetodo/:todo_master_id/:todo_id", deleteTodoController);

//pending
// todoRouter.post("/updatetodo", userController);
