"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoController = exports.addTodoController = exports.getTodosController = exports.deleteTodoController = void 0;
const db_1 = require("../db/");
const deleteTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo_master_id, todo_id } = req.params;
    console.log(todo_master_id, todo_id);
    const data = yield (0, db_1.deleteTodo)(todo_master_id, todo_id);
    console.log(data);
    return res.json({ data });
});
exports.deleteTodoController = deleteTodoController;
const getTodosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const data = yield (0, db_1.getAllTodos)(id);
    console.log(data);
    return res.json({ data });
});
exports.getTodosController = getTodosController;
const addTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, color, title, description, isStarred, time, date } = req.body;
    const data = yield (0, db_1.insertTodo)({
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
});
exports.addTodoController = addTodoController;
const updateTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo_id, id, title, color, description, isStarred, time } = req.body;
    const data = yield (0, db_1.updateTodo)(todo_id, id, title, description, color, isStarred, time);
    console.log(data);
    return res.json({ data });
});
exports.updateTodoController = updateTodoController;
//# sourceMappingURL=todo.controller.js.map