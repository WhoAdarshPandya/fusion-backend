"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 2002;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.json({ msg: "hi fusion api" });
});
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map