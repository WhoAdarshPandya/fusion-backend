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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const utils_1 = require("./utils");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
const socket_1 = require("./socket");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const controllers_1 = require("./controllers");
(0, dotenv_1.config)();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({ createParentPath: true }));
app.use(express_1.default.json());
app.use(utils_1.limiter);
(0, config_1.connectDB)();
(0, utils_1.initCloudinary)();
io.on("connection", (socket) => {
    socket.on("sendReqEvent", ({ id, req_for_id, req_id, user_profile, username, name, req_by_id, }) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, socket_1.sendReqEvent)(io, id, req_for_id, req_id, user_profile, username, name, req_by_id);
    }));
    socket.on("accepted_req", ({ frinal_friend_id, f_user_id, friendship_id, date, time, f_name, f_user_name, f_user_profile, user_id, }) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, socket_1.acceptedReqEvent)(io, frinal_friend_id, f_user_id, friendship_id, date, time, f_name, f_user_name, f_user_profile, user_id);
    }));
    socket.on("updateFriends", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, socket_1.updateFriends)(io);
    }));
    socket.on("new_msg", ({ chat_id, another_chat_id, msg, sender_id, receiver_id, friendship_id, date, time, anonymousMode, }) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, socket_1.newMsgEvent)(io, chat_id, another_chat_id, msg, sender_id, receiver_id, friendship_id, date, time, anonymousMode);
    }));
});
app.get("/", (req, res) => {
    res.json({ msg: "hi from fusion api" });
});
app.use("/api/v1/login", routes_1.loginRouter);
app.use("/api/v1/signup", routes_1.signUpRouter);
app.use("/api/v1/user", middleware_1.verifyToken, routes_1.userRouter);
app.use("/api/v1/todos", middleware_1.verifyToken, routes_1.todoRouter);
app.use("/api/v1/friends/", middleware_1.verifyToken, routes_1.friendsRouter);
app.use("/api/v1/chats", middleware_1.verifyToken, routes_1.chatRouter);
app.use("/api/v1/requests", middleware_1.verifyToken, routes_1.requestRouter);
app.get("/api/private", middleware_1.verifyToken, (req, res) => {
    res.json({ msg: "hello" });
});
app.post("/api/v1/uploadimage", controllers_1.imageUploadController);
app.get("*", (req, res) => {
    return res.status(404).json({
        msg: "Seems like we're always thinking of ourselves when looking for something that's lost, but we never think much about the lost, whatever, whoever is unable to be found, whether it's a set of keys left somewhere and forgotten, a couple of guys wandering aimlessly in the woods, or someone who's disappeared inside himself. What if that's what they wanted all along? Not to be found.",
        success: false,
    });
});
server.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map