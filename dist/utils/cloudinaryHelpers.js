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
exports.uploadImage = exports.initCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = require("dotenv");
const uuid_1 = require("uuid");
(0, dotenv_1.config)();
const initCloudinary = () => {
    cloudinary_1.default.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};
exports.initCloudinary = initCloudinary;
const uploadImage = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield cloudinary_1.default.v2.uploader.upload(imageUrl, {
        resource_type: "image",
        public_id: `profile-${(0, uuid_1.v4)()}`,
        overwrite: true,
        folder: "profiles",
    }, (err, res) => {
        if (err) {
            return { success: false, imageUrl: "" };
        }
        else {
            return { success: false, imageUrl: res === null || res === void 0 ? void 0 : res.secure_url };
        }
    });
    return res;
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=cloudinaryHelpers.js.map