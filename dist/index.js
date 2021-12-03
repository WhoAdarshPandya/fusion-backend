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
const db_1 = require("./db/");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
(0, dotenv_1.config)();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({ createParentPath: true }));
app.use(express_1.default.json());
(0, config_1.connectDB)();
(0, utils_1.initCloudinary)();
io.on("connection", (socket) => {
    socket.on("sendReqEvent", ({ id, req_for_id, req_id, user_profile, username, name, req_by_id, }) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, db_1.insertRequest)({
            id,
            req_by_id,
            req_id,
            req_for_id,
            name,
            date: "f",
            time: "",
            username,
            user_profile,
        });
        if (data.success) {
            io.emit(`new_req${req_for_id}`, {
                msg: `${name} sent you friend request`,
            });
        }
    }));
    socket.on("accepted_req", ({ frinal_friend_id, f_user_id, friendship_id, date, time, f_name, f_user_name, f_user_profile, user_id, }) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, db_1.insertFriend)({
            id: frinal_friend_id,
            user_id: f_user_id,
            user_name: f_user_name,
            user_profile: f_user_profile,
            date,
            time,
            friendship_id,
            name: f_name,
        });
        if (data.success) {
            console.log(data);
            io.emit(`accepted${user_id}`, {
                msg: `${f_name} accepted your friend request`,
            });
        }
    }));
    socket.on("updateFriends", () => {
        io.emit("updateFriends", {});
    });
    socket.on("new_msg", ({ chat_id, another_chat_id, msg, sender_id, receiver_id, friendship_id, date, time, anonymousMode, }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!anonymousMode) {
            yield (0, db_1.insertChat)({
                id: chat_id,
                chat_id: (0, uuid_1.v4)(),
                date,
                time,
                friendship_id,
                msg,
                receiver_id,
                sender_id,
            });
            yield (0, db_1.insertChat)({
                id: another_chat_id,
                chat_id: (0, uuid_1.v4)(),
                date,
                time,
                friendship_id,
                msg,
                receiver_id,
                sender_id,
            });
        }
        io.emit(`loadChat${sender_id}`, { updateChat: true });
        io.emit(`new_incoming_msg${receiver_id}`, {
            chat_id,
            sender_id,
            msg,
            friendship_id,
        });
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
app.use("/api/v1/chats", routes_1.chatRouter);
app.use("/api/v1/requests", middleware_1.verifyToken, routes_1.requestRouter);
app.get("/api/private", middleware_1.verifyToken, (req, res) => {
    res.json({ msg: "hello" });
});
app.post("/api/v1/uploadimage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
app.get("*", (req, res) => {
    return res.json({
        msg: "Seems like we're always thinking of ourselves when looking for something that's lost, but we never think much about the lost, whatever, whoever is unable to be found, whether it's a set of keys left somewhere and forgotten, a couple of guys wandering aimlessly in the woods, or someone who's disappeared inside himself. What if that's what they wanted all along? Not to be found.",
        success: false,
    });
});
server.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map