"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).json({ msg: "access denied", success: false });
    try {
        const userData = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        req.user = userData;
        next();
    }
    catch (err) {
        res
            .status(400)
            .json({ msg: "token expired | something went wrong", success: false });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map