"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.todoRouter = (0, express_1.Router)();
exports.todoRouter.get("/gettodos/:id", controllers_1.getTodosController);
exports.todoRouter.post("/addtodo", controllers_1.addTodoController);
exports.todoRouter.get("/deletetodo/:todo_master_id/:todo_id", controllers_1.deleteTodoController);
exports.todoRouter.post("/updatetodo", controllers_1.updateTodoController);
//# sourceMappingURL=todo.route.js.map