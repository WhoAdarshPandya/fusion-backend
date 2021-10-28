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
exports.loginHandler = void 0;
const utils_1 = require("./../utils/");
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, utils_1.loginValidator)(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    if (req.body.type === "email") {
    }
    else {
    }
});
exports.loginHandler = loginHandler;
//# sourceMappingURL=login.controller.js.map