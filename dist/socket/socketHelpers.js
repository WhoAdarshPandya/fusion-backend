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
exports.newMsgEvent = exports.updateFriends = exports.acceptedReqEvent = exports.sendReqEvent = void 0;
const db_1 = require("../db");
const uuid_1 = require("uuid");
const sendReqEvent = (io, id, req_for_id, req_id, user_profile, username, name, req_by_id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, db_1.insertRequest)({
        id,
        req_by_id,
        req_id,
        req_for_id,
        name,
        date: "f",
        time: "",
        username,
        user_profile,
    });
    if (data.success) {
        io.emit(`new_req${req_for_id}`, {
            msg: `${name} sent you friend request`,
        });
    }
});
exports.sendReqEvent = sendReqEvent;
const acceptedReqEvent = (io, frinal_friend_id, f_user_id, friendship_id, date, time, f_name, f_user_name, f_user_profile, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, db_1.insertFriend)({
        id: frinal_friend_id,
        user_id: f_user_id,
        user_name: f_user_name,
        user_profile: f_user_profile,
        date,
        time,
        friendship_id,
        name: f_name,
    });
    if (data.success) {
        console.log(data);
        io.emit(`accepted${user_id}`, {
            msg: `${f_name} accepted your friend request`,
        });
    }
});
exports.acceptedReqEvent = acceptedReqEvent;
const updateFriends = (io) => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("updateFriends", {});
});
exports.updateFriends = updateFriends;
const newMsgEvent = (io, chat_id, another_chat_id, msg, sender_id, receiver_id, friendship_id, date, time, anonymousMode) => __awaiter(void 0, void 0, void 0, function* () {
    if (!anonymousMode) {
        yield (0, db_1.insertChat)({
            id: chat_id,
            chat_id: (0, uuid_1.v4)(),
            date,
            time,
            friendship_id,
            msg,
            receiver_id,
            sender_id,
        });
        yield (0, db_1.insertChat)({
            id: another_chat_id,
            chat_id: (0, uuid_1.v4)(),
            date,
            time,
            friendship_id,
            msg,
            receiver_id,
            sender_id,
        });
    }
    io.emit(`loadChat${sender_id}`, { updateChat: true });
    io.emit(`new_incoming_msg${receiver_id}`, {
        chat_id,
        sender_id,
        msg,
        friendship_id,
    });
});
exports.newMsgEvent = newMsgEvent;
//# sourceMappingURL=socketHelpers.js.map