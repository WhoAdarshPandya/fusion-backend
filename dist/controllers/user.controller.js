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
exports.updateUserInfoController = exports.updateUserProfileController = exports.updateUserDndController = exports.updateUserNotificationController = exports.updateUserPasswordController = exports.deleteUserController = exports.userController = void 0;
const db_1 = require("./../db/");
const bcrypt_1 = require("bcrypt");
const userController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield (0, db_1.getAllUserData)(id);
    console.log(data);
    return res.json({ data });
});
exports.userController = userController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield (0, db_1.deleteUser)(id);
    console.log(data);
    return res.json({ data });
});
exports.deleteUserController = deleteUserController;
const updateUserPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email, old_pass, new_pass } = req.body;
    const datata = yield (0, db_1.findUserByEmailOrUserName)({
        type: "email",
        value: email,
    });
    if (datata.success && datata.count > 0) {
        const db_pass = datata.res[0].password;
        const db_decrypted_pass = (0, bcrypt_1.compareSync)(old_pass, db_pass);
        if (db_decrypted_pass) {
            let new_pass_enc = (0, bcrypt_1.hashSync)(new_pass, 10);
            const data = yield (0, db_1.updatePassword)(id, new_pass_enc);
            return res.json({ data });
        }
        else {
            return res.json({ success: false, msg: "password not updated" });
        }
    }
    else {
        return res.json({ success: false, msg: "no user found" });
    }
});
exports.updateUserPasswordController = updateUserPasswordController;
const updateUserNotificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, notification } = req.body;
    const data = yield (0, db_1.updateUserNotification)(id, notification);
    console.log(data);
    return res.json({ data });
});
exports.updateUserNotificationController = updateUserNotificationController;
const updateUserDndController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, dnd } = req.body;
    const data = yield (0, db_1.updateUserDND)(id, dnd);
    console.log(data);
    return res.json({ data });
});
exports.updateUserDndController = updateUserDndController;
const updateUserProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, url } = req.body;
    const data = yield (0, db_1.updateUserProfile)(id, url);
    console.log(data);
    return res.json({ data });
});
exports.updateUserProfileController = updateUserProfileController;
const updateUserInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, user_name, theme, email } = req.body;
    const data = yield (0, db_1.updateUserInfo)(id, name, user_name, theme, email);
    console.log(data);
    return res.json({ data });
});
exports.updateUserInfoController = updateUserInfoController;
//# sourceMappingURL=user.controller.js.map