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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const utils_1 = require("./../utils/");
const db_1 = require("../db");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, utils_1.loginValidator)(req.body);
    if (error)
        return res.status(200).json({ msg: error.details[0].message });
    const { type, password } = req.body;
    if (type === "email") {
        const userData = yield (0, db_1.findUserByEmailOrUserName)({
            type: "email",
            value: req.body.email,
        });
        if (userData && userData.success) {
            if (userData.count > 0) {
                let pwd = userData.res[0].password;
                let isValid = (0, bcrypt_1.compareSync)(password, pwd);
                if (isValid) {
                    const token = jsonwebtoken_1.default.sign({ user: userData.res[0] }, process.env.SECRET_TOKEN, {
                        expiresIn: "2h",
                    });
                    return res.cookie("token", token).json({
                        msg: "log in successful",
                        success: true,
                        token,
                        userData: userData.res[0],
                    });
                }
                else {
                    res.json({ msg: "unsuccessful login attempt", success: false });
                }
            }
            else {
                res.json({ msg: "no user found", success: false });
            }
        }
    }
    if (type === "user_name") {
        const userData = yield (0, db_1.findUserByEmailOrUserName)({
            type: "user_name",
            value: req.body.user_name,
        });
        if (userData && userData.success) {
            if (userData.count > 0) {
                let pwd = userData.res[0].password;
                let isValid = (0, bcrypt_1.compareSync)(password, pwd);
                if (isValid) {
                    const token = jsonwebtoken_1.default.sign({ user: userData.res[0] }, process.env.SECRET_TOKEN, {
                        expiresIn: "2h",
                    });
                    return res.json({
                        msg: "log in successful",
                        success: true,
                        token,
                        userData: userData.res[0],
                    });
                }
                else {
                    return res.json({
                        msg: "unsuccessful login attempt",
                        success: false,
                    });
                }
            }
            else {
                return res.json({ msg: "no user found", success: false });
            }
        }
    }
});
exports.loginHandler = loginHandler;
//# sourceMappingURL=login.controller.js.map