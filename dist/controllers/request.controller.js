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
exports.addRequestController = exports.getRequestsController = exports.deleteRequestController = void 0;
const db_1 = require("../db/");
const deleteRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { request_master_id, request_id } = req.params;
    const data = yield (0, db_1.deleteRequest)(request_master_id, request_id);
    console.log(data);
    return res.json({ data });
});
exports.deleteRequestController = deleteRequestController;
const getRequestsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const data = yield (0, db_1.getAllRequests)(id);
    console.log(data);
    return res.json({ data });
});
exports.getRequestsController = getRequestsController;
const addRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const data = yield (0, db_1.insertRequest)({
        id,
        date: "a",
        req_for_id: "bb",
        req_id: "030",
        time: "jh",
        user_profile: "sadf",
        username: "saran",
    });
    console.log(data);
    return res.json({ data });
});
exports.addRequestController = addRequestController;
//# sourceMappingURL=request.controller.js.map