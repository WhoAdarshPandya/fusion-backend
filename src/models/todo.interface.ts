export interface OgTodo {
  id: String;
  title: String;
  description: String;
  date: string;
  time: string;
  isStarred: Boolean;
  color: string;
}

export interface Todo {
  todo_id: String;
  todos: [OgTodo];
}
