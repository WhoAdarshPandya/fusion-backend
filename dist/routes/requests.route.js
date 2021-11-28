"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.requestRouter = (0, express_1.Router)();
exports.requestRouter.get("/getrequests/:id", controllers_1.getRequestsController);
exports.requestRouter.post("/addrequest", controllers_1.addRequestController);
exports.requestRouter.get("/deleterequest/:request_master_id/:request_id", controllers_1.deleteRequestController);
//# sourceMappingURL=requests.route.js.map