import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config";
import { initCloudinary, limiter, uploadImage } from "./utils";
import http from "http";
import { Server, Socket } from "socket.io";
import {
  chatRouter,
  friendsRouter,
  loginRouter,
  signUpRouter,
  userRouter,
  todoRouter,
  requestRouter,
} from "./routes";
import { verifyToken } from "./middleware";
import {
  acceptedReqEvent,
  newMsgEvent,
  sendReqEvent,
  updateFriends,
} from "./socket";
import { insertRequest, insertFriend, insertChat } from "./db/";
import expressFileUpload, { UploadedFile } from "express-fileupload";
import fs from "fs";
import { v4 } from "uuid";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { imageUploadController } from "./controllers";

/*
 * अपनी रचनाओं में वो ज़िंदा है,
 * 'नूर' संसार से गया ही नहीं
 */

config();

const PORT = process.env.PORT;
const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> =
  new Server(server, { cors: { origin: "*" } });

app.use(helmet());
app.use(cors());
app.use(expressFileUpload({ createParentPath: true }));
app.use(express.json());
app.use(limiter);

connectDB();
initCloudinary();

io.on("connection", (socket: Socket) => {
  socket.on(
    "sendReqEvent",
    async ({
      id,
      req_for_id,
      req_id,
      user_profile,
      username,
      name,
      req_by_id,
    }) => {
      await sendReqEvent(
        io,
        id,
        req_for_id,
        req_id,
        user_profile,
        username,
        name,
        req_by_id
      );
    }
  );

  socket.on(
    "accepted_req",
    async ({
      frinal_friend_id,
      f_user_id,
      friendship_id,
      date,
      time,
      f_name,
      f_user_name,
      f_user_profile,
      user_id,
    }) => {
      await acceptedReqEvent(
        io,
        frinal_friend_id,
        f_user_id,
        friendship_id,
        date,
        time,
        f_name,
        f_user_name,
        f_user_profile,
        user_id
      );
    }
  );

  socket.on("updateFriends", async () => {
    await updateFriends(io);
  });

  socket.on(
    "new_msg",
    async ({
      chat_id,
      another_chat_id,
      msg,
      sender_id,
      receiver_id,
      friendship_id,
      date,
      time,
      anonymousMode,
    }) => {
      await newMsgEvent(
        io,
        chat_id,
        another_chat_id,
        msg,
        sender_id,
        receiver_id,
        friendship_id,
        date,
        time,
        anonymousMode
      );
    }
  );
});

// ?Routes
// all verified
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "hi from fusion api" });
});

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/signup", signUpRouter);
// verified insert/get/delete/update password/notificaiton/dnd/profile/info
app.use("/api/v1/user", verifyToken, userRouter);

// verified insert/get/delete/update
app.use("/api/v1/todos", verifyToken, todoRouter);

// verified get and delete and insert
app.use("/api/v1/friends/", verifyToken, friendsRouter);

// verified get,delete,add
app.use("/api/v1/chats", verifyToken, chatRouter);

// verified get,delete,add
app.use("/api/v1/requests", verifyToken, requestRouter);

// verified
app.get("/api/private", verifyToken, (req, res) => {
  res.json({ msg: "hello" });
});

// verified
app.post("/api/v1/uploadimage", imageUploadController);

// 404
app.get("*", (req, res) => {
  return res.status(404).json({
    msg: "Seems like we're always thinking of ourselves when looking for something that's lost, but we never think much about the lost, whatever, whoever is unable to be found, whether it's a set of keys left somewhere and forgotten, a couple of guys wandering aimlessly in the woods, or someone who's disappeared inside himself. What if that's what they wanted all along? Not to be found.",
    success: false,
  });
});

server.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
