"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidator = exports.loginValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const loginValidator = (data) => {
    let checkSchemaForEmail = joi_1.default.object({
        email: joi_1.default.string().lowercase().min(9).max(30).email().required(),
        password: joi_1.default.string().required(),
        type: joi_1.default.string().required(),
    });
    let checkSchemaForUserName = joi_1.default.object({
        user_name: joi_1.default.string().lowercase().min(6).max(15).token().required(),
        password: joi_1.default.string().required(),
        type: joi_1.default.string().required(),
    });
    if (data.type === undefined || data.type === null || data.type === "") {
        return checkSchemaForEmail.validate(data);
    }
    else if (data.type === "email") {
        return checkSchemaForEmail.validate(data);
    }
    else if (data.type === "user_name") {
        return checkSchemaForUserName.validate(data);
    }
    else {
        return checkSchemaForEmail.validate(data);
    }
};
exports.loginValidator = loginValidator;
const signUpValidator = (data) => {
    let checkSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        user_name: joi_1.default.string().required().min(6).max(15).token().lowercase(),
        email: joi_1.default.string().lowercase().min(9).max(30).email().required(),
        password: joi_1.default.string().required(),
        confirm_password: joi_1.default.string().required(),
        profile_url: joi_1.default.string().required(),
    });
    return checkSchema.validate(data);
};
exports.signUpValidator = signUpValidator;
//# sourceMappingURL=validator.js.map