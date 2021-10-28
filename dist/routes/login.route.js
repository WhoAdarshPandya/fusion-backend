"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.loginRouter = (0, express_1.Router)();
exports.loginRouter.post("/", controllers_1.loginHandler);
//# sourceMappingURL=login.route.js.map