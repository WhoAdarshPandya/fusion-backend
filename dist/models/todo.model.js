"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoModel = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});
exports.todoModel = (0, mongoose_1.model)("todo", todoSchema);
//# sourceMappingURL=todo.model.js.map