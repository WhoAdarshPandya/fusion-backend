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
exports.getAllUserData = exports.insertUser = exports.findUserByEmailOrUserName = void 0;
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
        notification: true,
    });
    const resp = yield user
        .save()
        .then((res) => ({ msg: "inserted", success: true, res }))
        .catch((err) => ({ msg: "inserted", success: false, err }));
    return resp;
});
exports.insertUser = insertUser;
const getAllUserData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.userModel
        .find({ user_id: id })
        .then((result) => {
        return { success: true, result };
    })
        .catch((err) => ({ err, success: false }));
    return data;
});
exports.getAllUserData = getAllUserData;
//# sourceMappingURL=db.helpers.js.map