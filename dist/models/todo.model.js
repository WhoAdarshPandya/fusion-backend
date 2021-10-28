"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoModel = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
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
exports.todoModel = (0, mongoose_1.model)("todo", todoSchema);
//# sourceMappingURL=todo.model.js.map