"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.friendsRouter = (0, express_1.Router)();
exports.friendsRouter.get("/getfriends/:id", controllers_1.getFriendsController);
exports.friendsRouter.post("/addfriend", controllers_1.addFriendController);
exports.friendsRouter.get("/deletefriend/:friend_master_id/:friend_id", controllers_1.deleteFriendController);
//# sourceMappingURL=friends.route.js.map