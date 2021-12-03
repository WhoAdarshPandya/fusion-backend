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
exports.updatePassword = exports.updateUserDND = exports.updateUserNotification = exports.updateUserProfile = exports.updateUserInfo = exports.updateTodo = exports.deleteRequest = exports.deleteTodo = exports.deleteChat = exports.deleteFriend = exports.deleteUser = exports.getAllChats = exports.getAllRequests = exports.getAllFriends = exports.getAllTodos = exports.getAllUsers = exports.getAllUserData = exports.insertChat = exports.insertRequest = exports.insertFriend = exports.insertTodo = exports.insertUser = exports.findUserByEmailOrUserName = void 0;
const models_1 = require("../models");
const uuid_1 = require("uuid");
const findUserByEmailOrUserName = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let result = { res: [], success: false };
    if (data.type === "email") {
        yield models_1.userModel.find({ email: data.value }, (err, res) => {
            if (err) {
                result = { err, success: false };
            }
            else {
                result = { res, success: true, count: res.length };
            }
        });
    }
    else if (data.type === "user_name") {
        yield models_1.userModel.find({ user_name: data.value }, (err, res) => {
            if (err) {
                result = { err, success: false };
            }
            else {
                result = { res, success: true, count: res.length };
            }
        });
    }
    else {
        yield models_1.userModel.find({
            $or: [{ email: data.value.email }, { user_name: data.value.user_name }],
        }, (err, res) => {
            if (err) {
                result = { err, success: false };
            }
            else {
                result = { res, success: true, count: res.length };
            }
        });
    }
    return result;
});
exports.findUserByEmailOrUserName = findUserByEmailOrUserName;
const insertUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, uuid_1.v4)();
    const todo_id = (0, uuid_1.v4)();
    const request_id = (0, uuid_1.v4)();
    const chat_id = (0, uuid_1.v4)();
    const friend_id = (0, uuid_1.v4)();
    const user = new models_1.userModel({
        user_id,
        name: data.name,
        user_name: data.user_name,
        email: data.email,
        friend_id,
        chat_id,
        todo_id,
        request_id,
        theme: "orange",
        password: data.password,
        profile_url: data.profile_url,
        joined_at: data.joined_at,
        dnd: false,
        notification: false,
    });
    const resp = yield user
        .save()
        .then((res) => ({ msg: "inserted", success: true, res }))
        .catch((err) => ({ msg: "inserted", success: false, err }));
    yield models_1.todoModel.insertMany([{ todo_id }]);
    yield models_1.friendListModel.insertMany([{ friend_id }]);
    yield models_1.requestsModel.insertMany([{ request_id }]);
    yield models_1.chatModel.insertMany([{ chat_id }]);
    return resp;
});
exports.insertUser = insertUser;
const insertTodo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, isStarred, title, description, date, time, color } = data;
    const todo = { title, description, date, time, color, isStarred };
    const resp = yield models_1.todoModel
        .updateMany({ todo_id: id }, { $push: { todos: todo } })
        .then((result) => ({ success: true, result }))
        .catch((err) => ({ success: false, err }));
    return resp;
});
exports.insertTodo = insertTodo;
const insertFriend = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user_id, friendship_id, date, time, name, user_name, user_profile, } = data;
    const friend = {
        id,
        user_id,
        friendship_id,
        date,
        time,
        name,
        user_name,
        user_profile,
    };
    const resp = yield models_1.friendListModel
        .updateMany({ friend_id: id }, { $push: { friends: friend } })
        .then((result) => ({ success: true, result }))
        .catch((err) => ({ success: false, err }));
    return resp;
});
exports.insertFriend = insertFriend;
const insertRequest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, req_id, name, req_by_id, req_for_id, date, time, username, user_profile, } = data;
    const request = {
        req_id,
        req_by_id,
        name,
        req_for_id,
        date,
        time,
        username,
        user_profile,
    };
    const resp = yield models_1.requestsModel
        .updateMany({ request_id: id }, { $push: { requests: request } })
        .then((result) => ({ success: true, result }))
        .catch((err) => ({ success: false, err }));
    return resp;
});
exports.insertRequest = insertRequest;
const insertChat = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, chat_id, msg, sender_id, receiver_id, friendship_id, date, time, } = data;
    const chat = {
        chat_id,
        msg,
        sender_id,
        receiver_id,
        friendship_id,
        date,
        time,
    };
    const resp = yield models_1.chatModel
        .updateMany({ chat_id: id }, { $push: { chats: chat } })
        .then((result) => ({ success: true, result }))
        .catch((err) => ({ success: false, err }));
    return resp;
});
exports.insertChat = insertChat;
const getAllUserData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.userModel
        .find({ user_id: id })
        .lean()
        .then((result) => {
        return { success: true, result };
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.getAllUserData = getAllUserData;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.userModel
        .find({})
        .lean()
        .then((result) => {
        return {
            success: true,
            result: [
                ...result.map((user) => {
                    return {
                        _id: user._id,
                        name: user.name,
                        user_name: user.user_name,
                        user_id: user.user_id,
                        profile_url: user.profile_url,
                        email: user.email,
                        request_id: user.request_id,
                        chat_id: user.chat_id,
                        friend_id: user.friend_id,
                        dnd: user.dnd,
                    };
                }),
            ],
        };
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.getAllUsers = getAllUsers;
const getAllTodos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.todoModel
        .find({ todo_id: id })
        .lean()
        .then((result) => {
        return { success: true, result };
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.getAllTodos = getAllTodos;
const getAllFriends = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.friendListModel
        .find({ friend_id: id })
        .lean()
        .then((result) => {
        console.log(result);
        return { success: true, result: result[0].friends };
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.getAllFriends = getAllFriends;
const getAllRequests = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.requestsModel
        .find({ request_id: id })
        .lean()
        .then((result) => {
        return { success: true, result: result[0].requests };
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.getAllRequests = getAllRequests;
const getAllChats = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.chatModel
        .find({ chat_id: id })
        .lean()
        .then((result) => {
        return { success: true, result: result[0].chats };
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.getAllChats = getAllChats;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.userModel
        .deleteOne({ user_id: id })
        .then((result) => {
        if (result.deletedCount > 0) {
            console.log("deleted" + result.deletedCount);
            return { success: true, count: result.deletedCount };
        }
        else {
            return { success: true, msg: "not deleted" };
        }
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.deleteUser = deleteUser;
const deleteFriend = (master_id, id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.friendListModel
        .updateOne({ friend_id: master_id }, { $pull: { friends: { _id: id } } }, { multi: false })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated" + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            return { success: true, msg: "not updated" };
        }
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.deleteFriend = deleteFriend;
const deleteChat = (master_id, id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.chatModel
        .updateOne({ chat_id: master_id }, { $pull: { chats: { _id: id } } }, { multi: false })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated chat: " + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            return { success: true, msg: "not updated chat" };
        }
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.deleteChat = deleteChat;
const deleteTodo = (todo_master_id, id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.todoModel
        .updateOne({ todo_id: todo_master_id }, { $pull: { todos: { _id: id } } }, { multi: false })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated todo: " + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            console.log(result.nModified);
            return { success: true, msg: "not updated todo" };
        }
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.deleteTodo = deleteTodo;
const deleteRequest = (request_master_id, id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.requestsModel
        .updateOne({ request_id: request_master_id }, { $pull: { requests: { _id: id } } }, { multi: false })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated todo: " + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            console.log(result.nModified);
            return { success: true, msg: "not updated request" };
        }
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.deleteRequest = deleteRequest;
const updateTodo = (todo_id, id, title, description, color, isStarred, time) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.todoModel
        .updateOne({ todo_id: todo_id, "todos._id": id }, {
        $set: {
            "todos.$._id": id,
            "todos.$.title": title,
            "todos.$.description": description,
            "todos.$.color": color,
            "todos.$.time": time,
            "todos.$.isStarred": isStarred,
        },
    })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated todo: " + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            console.log(result.nModified);
            return { success: true, msg: "not updated todo" };
        }
    })
        .catch((err) => ({ success: false, err }));
    return data;
});
exports.updateTodo = updateTodo;
const updateUserInfo = (id, name, user_name, theme, email) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.userModel
        .updateOne({ user_id: id }, { $set: { name: name, user_name: user_name, theme: theme, email: email } })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated user info: " + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            console.log(result.nModified);
            return { success: true, msg: "not updated user info" };
        }
    });
    return data;
});
exports.updateUserInfo = updateUserInfo;
const updateUserProfile = (id, url) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.userModel
        .updateOne({ user_id: id }, { $set: { profile_url: url } })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated image: " + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            console.log(result.nModified);
            return { success: true, msg: "not updated image" };
        }
    });
    return data;
});
exports.updateUserProfile = updateUserProfile;
const updateUserNotification = (id, notification) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.userModel
        .updateOne({ user_id: id }, { $set: { notification: notification } })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated notification: " + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            console.log(result.nModified);
            return { success: true, msg: "not updated notification" };
        }
    });
    return data;
});
exports.updateUserNotification = updateUserNotification;
const updateUserDND = (id, DND) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.userModel
        .updateOne({ user_id: id }, { $set: { dnd: DND } })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated dnd: " + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            console.log(result.nModified);
            return { success: true, msg: "not updated dnd" };
        }
    });
    return data;
});
exports.updateUserDND = updateUserDND;
const updatePassword = (id, newPass) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.userModel
        .updateOne({ user_id: id }, { $set: { password: newPass } })
        .lean()
        .then((result) => {
        if (result.nModified) {
            console.log("updated password: " + result.nModified);
            return { success: true, count: result.nModified };
        }
        else {
            console.log(result.nModified);
            return { success: true, msg: "not updated password" };
        }
    });
    return data;
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=db.helpers.js.map