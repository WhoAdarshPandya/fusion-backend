import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config";
import { limiter } from "./utils";
import http from "http";
import { Server, Socket } from "socket.io";
import { loginRouter, signUpRouter, userRouter } from "./routes";
import { verifyToken } from "./middleware";

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
app.use(express.json());
app.use(limiter);

connectDB();

io.on("connection", (socket: Socket) => {
  console.log(socket);
});

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "hi from fusion api" });
});

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/signup", signUpRouter);
app.use("/api/v1/user", verifyToken, userRouter);
app.get("/api/private", verifyToken, (req, res) => {
  res.json({ msg: "hello" });
});

server.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
