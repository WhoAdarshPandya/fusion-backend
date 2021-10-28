"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 200,
    statusCode: 200,
    message: JSON.stringify({ msg: "You're being rate limited", success: false }),
});
//# sourceMappingURL=rateLimiter.js.map