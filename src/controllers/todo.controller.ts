import { insertTodo, getAllTodos, deleteTodo } from "../db/";
import { RequestHandler, Request, Response } from "express";

export const deleteTodoController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { todo_master_id, todo_id } = req.params;
  console.log(todo_master_id, todo_id);
  const data = await deleteTodo(todo_master_id, todo_id);
  console.log(data);
  return res.json({ data });
};

export const getTodosController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  console.log(id);
  const data = await getAllTodos(id);
  console.log(data);
  return res.json({ data });
};

export const addTodoController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  const data = await insertTodo({
    id,
    color: "a",
    date: "asd",
    description: "sdf",
    isStarred: false,
    time: "asd",
    title: "atyachar",
  });
  console.log(data);
  return res.json({ data });
};
