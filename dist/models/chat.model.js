"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatModel = void 0;
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    chat_id: { type: String, required: true },
    chats: {
        type: [
            {
                chat_id: String,
                msg: String,
                sender_id: String,
                receiver_id: String,
                friendship_id: String,
                date: String,
                time: String,
                isSeen: Boolean
            },
        ],
        required: true,
        default: [],
    },
});
exports.chatModel = (0, mongoose_1.model)("chat", ChatSchema);
//# sourceMappingURL=chat.model.js.map