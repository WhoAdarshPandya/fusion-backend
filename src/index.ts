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
import { insertRequest, insertFriend, insertChat } from "./db/";
import expressFileUpload, { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";
import fs from "fs";

/*
 * अपनी रचनाओं में वो ज़िंदा है
 * 'नूर' संसार से गया ही नहीं
 */

config();

const PORT = process.env.PORT;
const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(helmet());
app.use(cors());
app.use(expressFileUpload({ createParentPath: true }));
app.use(express.json());
// app.use(limiter);

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
      const data = await insertRequest({
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
      const data = await insertFriend({
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
    }
  );

  socket.on("updateFriends", () => {
    io.emit("updateFriends", {});
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
      if (!anonymousMode) {
        await insertChat({
          id: chat_id,
          chat_id: v4(),
          date,
          time,
          friendship_id,
          msg,
          receiver_id,
          sender_id,
        });
        await insertChat({
          id: another_chat_id,
          chat_id: v4(),
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
app.use("/api/v1/chats", chatRouter);

// verified get,delete,add
app.use("/api/v1/requests", verifyToken, requestRouter);

// verified
app.get("/api/private", verifyToken, (req, res) => {
  res.json({ msg: "hello" });
});

// verified
app.post("/api/v1/uploadimage", async (req, res) => {
  if (req.files === null || req.files === undefined) {
    return res.status(200).json({ msg: "no image provided", success: false });
  }
  const file = req.files!.ProfileImage as UploadedFile;
  const ImageUrl = `IMG_${Date.now()}_${file.name}`;
  file.mv(`${__dirname}/src/assets/${ImageUrl}`, async (err) => {
    if (err) {
      return res.status(200).json({ message: "server error", success: false });
    } else {
      await uploadImage(`${__dirname}/src/assets/${ImageUrl}`)
        .then((result) => {
          console.log(result);
          fs.rm(`${__dirname}/src/assets/${ImageUrl}`, (err) => {
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
  });
});

// 404
app.get("*", (req, res) => {
  return res.json({
    msg: "Seems like we're always thinking of ourselves when looking for something that's lost, but we never think much about the lost, whatever, whoever is unable to be found, whether it's a set of keys left somewhere and forgotten, a couple of guys wandering aimlessly in the woods, or someone who's disappeared inside himself. What if that's what they wanted all along? Not to be found.",
    success: false,
  });
});

server.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
