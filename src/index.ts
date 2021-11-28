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
// import { v4 } from "uuid";
import { insertFriend } from "./db/db.helpers";
// import fs from "fs";
import expressFileUpload, { UploadedFile } from "express-fileupload";
import fs from "fs";
// import { UploadedFile } from "express-fileupload";

/*
 * अपनी रचनाओं में वो ज़िंदा है
 * 'नूर' संसार से गया ही नहीं
 */

config();

const PORT = process.env.PORT;
const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(helmet());
app.use(cors());
app.use(expressFileUpload({ createParentPath: true }));
app.use(express.json());
app.use(limiter);

connectDB();
initCloudinary();

io.on("connection", (socket: Socket) => {
  // console.log(socket);
});
// all verified
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "hi from fusion api" });
});

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/signup", signUpRouter);
// verified insert/get/delete (update pending)
app.use("/api/v1/user", verifyToken, userRouter);

// verified insert/get/delete (update pending)
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
app.post("/api/v1/uploadimage", async (req, res) => {
  if (req.files === null || req.files === undefined) {
    return res
      .status(200)
      .json({ message: "no image provided", success: false });
  }
  const file = req.files!.ProfileImage as UploadedFile;
  const ImageUrl = `IMG_${Date.now()}_${file.name}`;
  file.mv(`${__dirname}/assets/${ImageUrl}`, async (err) => {
    if (err) {
      return res.status(200).json({ message: "server error", success: false });
    } else {
      await uploadImage(`./src/assets/${ImageUrl}`)
        .then((result) => {
          console.log(result);
          fs.rm(`${__dirname}/assets/${ImageUrl}`, (err) => {
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

server.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
