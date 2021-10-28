"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsModel = void 0;
const mongoose_1 = require("mongoose");
const RequestSchema = new mongoose_1.Schema({
    request_id: { type: String, required: true },
    requests: {
        type: [
            {
                req_id: String,
                req_by_id: String,
                req_for_id: String,
                date: String,
                time: String,
                username: String,
                user_profile: String,
            },
        ],
        required: true,
        default: [],
    },
});
exports.requestsModel = (0, mongoose_1.model)("request", RequestSchema);
//# sourceMappingURL=requests.model.js.map