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
exports.imageUploadController = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils");
const imageUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files === null || req.files === undefined) {
        return res.status(200).json({ msg: "no image provided", success: false });
    }
    const file = req.files.ProfileImage;
    const ImageUrl = `IMG_${Date.now()}_${file.name}`;
    file.mv(`${__dirname}/src/assets/${ImageUrl}`, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(200).json({ message: "server error", success: false });
        }
        else {
            yield (0, utils_1.uploadImage)(`${__dirname}/src/assets/${ImageUrl}`)
                .then((result) => {
                console.log(result);
                fs_1.default.rm(`${__dirname}/src/assets/${ImageUrl}`, (err) => {
                    console.log(err);
                });
                return res.json({
                    msg: "image uploaded!",
                    url: result.secure_url,
                    success: true,
                });
            })
                .catch((err) => {
                console.log(err);
                return res.json({ msg: "error occured", success: false, err });
            });
        }
    }));
});
exports.imageUploadController = imageUploadController;
//# sourceMappingURL=image.controller.js.map