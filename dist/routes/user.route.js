"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/getalldata/:id", controllers_1.userController);
//# sourceMappingURL=user.route.js.map