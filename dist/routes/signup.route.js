"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.signUpRouter = (0, express_1.Router)();
exports.signUpRouter.get("/", controllers_1.signUpHandler);
//# sourceMappingURL=signup.route.js.map