import express, { Application, Request, Response } from "express";

const PORT = process.env.PORT || 2002;

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "hello wrald" });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
