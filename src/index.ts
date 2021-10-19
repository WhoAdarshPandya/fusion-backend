import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { connect, Document } from "mongoose";
import { Todo, todoModel } from "./models";
import cors from "cors";

config();

const PORT = process.env.PORT;
const app: Application = express();
app.use(cors());
app.use(express.json());
const db = connect(
  process.env.DB_URL!,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  (err) => {
    if (err) {
      console.log("connection failed");
    } else {
      console.log("ok");
    }
  }
);
(async () => {
  const todo: Document<Todo> = new todoModel({
    title: "dep",
    description: "loyed",
  });
  await todo.save();
})();
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "hi fusion api" });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
