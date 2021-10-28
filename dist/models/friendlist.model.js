"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendListModel = void 0;
const mongoose_1 = require("mongoose");
const FriendListSchema = new mongoose_1.Schema({
    friend_id: { type: String, required: true },
    friends: {
        type: [
            {
                user_id: String,
                friendship_id: String,
                date: String,
                time: String,
            },
        ],
        required: true,
        default: [],
    },
});
exports.friendListModel = (0, mongoose_1.model)("friendlist", FriendListSchema);
//# sourceMappingURL=friendlist.model.js.map