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
exports.addChatController = exports.getChatsController = exports.deleteChatController = void 0;
const db_1 = require("../db/");
const deleteChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat_master_id, chat_id } = req.params;
    const data = yield (0, db_1.deleteChat)(chat_master_id, chat_id);
    console.log(data);
    return res.json({ data });
});
exports.deleteChatController = deleteChatController;
const getChatsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const data = yield (0, db_1.getAllChats)(id);
    console.log(data);
    return res.json({ data });
});
exports.getChatsController = getChatsController;
const addChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, chat_id } = req.body;
    const data = yield (0, db_1.insertChat)({
        id,
        chat_id,
        date: "a",
        friendship_id: "b",
        msg: "hi",
        receiver_id: "D",
        sender_id: "E",
        time: "5:09",
    });
    console.log(data);
    return res.json({ data });
});
exports.addChatController = addChatController;
//# sourceMappingURL=chat.controller.js.map