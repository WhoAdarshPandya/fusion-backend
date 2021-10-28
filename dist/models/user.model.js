"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    friend_id: { type: String, required: true },
    chat_id: { type: String, required: true },
    todo_id: { type: String, required: true },
    theme: { type: String, required: true },
    password: { type: String, required: true },
    profile_url: { type: String, required: true },
    joined_at: { type: String, required: true },
    dnd: { type: Boolean, required: true },
    notification: { type: Boolean, required: true },
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=user.model.js.map