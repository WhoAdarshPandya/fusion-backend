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
exports.addFriendController = exports.getFriendsController = exports.deleteFriendController = void 0;
const db_1 = require("../db/");
const deleteFriendController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { friend_master_id, friend_id } = req.params;
    const data = yield (0, db_1.deleteFriend)(friend_master_id, friend_id);
    console.log(data);
    return res.json({ data });
});
exports.deleteFriendController = deleteFriendController;
const getFriendsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield (0, db_1.getAllFriends)(id);
    console.log(data);
    return res.json({ data });
});
exports.getFriendsController = getFriendsController;
const addFriendController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user_id, friendship_id } = req.body;
    console.log(id, user_id, friendship_id);
    const data = yield (0, db_1.insertFriend)({
        id,
        friendship_id,
        user_id,
        date: "trial",
        time: "time",
    });
    console.log(data);
    return res.json({ data });
});
exports.addFriendController = addFriendController;
//# sourceMappingURL=friends.controller.js.map