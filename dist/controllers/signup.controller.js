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
exports.signUpHandler = void 0;
const utils_1 = require("./../utils/");
const db_1 = require("../db");
const bcrypt_1 = require("bcrypt");
let saltRounds = 10;
const signUpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, utils_1.signUpValidator)(req.body);
    if (error)
        return res
            .status(200)
            .json({ msg: error.details[0].message, success: false });
    const { name, user_name, profile_url, password, email } = req.body;
    const data = yield (0, db_1.findUserByEmailOrUserName)({
        type: "both",
        value: { email: req.body.email, user_name: req.body.user_name },
    });
    if (data && data.count === 0) {
        let hashedPwd = (0, bcrypt_1.hashSync)(password, saltRounds);
        const userData = yield (0, db_1.insertUser)({
            name,
            user_name,
            email,
            password: hashedPwd,
            profile_url,
            joined_at: String(Date.now()),
        });
        if (userData && userData.success) {
            res.status(200).json({ msg: "user signed up", success: true });
        }
        else {
            console.log(userData);
            res.status(200).json({ msg: "something went wrong", success: false });
        }
    }
    else {
        res.json({
            msg: "user with same user name or email exists",
            success: false,
        });
    }
});
exports.signUpHandler = signUpHandler;
//# sourceMappingURL=signup.controller.js.map