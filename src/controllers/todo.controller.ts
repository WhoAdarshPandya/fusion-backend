import { insertTodo, getAllTodos, deleteTodo, updateTodo } from "../db/";
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
  const { id, color, title, description, isStarred, time, date } = req.body;
  const data = await insertTodo({
    id,
    color,
    date,
    description,
    isStarred,
    time,
    title,
  });
  console.log(data);
  return res.json({ data });
};

export const updateTodoController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { todo_id, id, title, color, description, isStarred, time } = req.body;
  const data = await updateTodo(
    todo_id,
    id,
    title,
    description,
    color,
    isStarred,
    time
  );
  console.log(data);
  return res.json({ data });
};
