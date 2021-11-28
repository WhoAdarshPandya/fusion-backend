"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.chatRouter = (0, express_1.Router)();
exports.chatRouter.get("/getchats/:id", controllers_1.getChatsController);
exports.chatRouter.post("/addchat", controllers_1.addChatController);
exports.chatRouter.get("/deletechat/:chat_master_id/:chat_id", controllers_1.deleteChatController);
//# sourceMappingURL=chat.route.js.map