import { Router } from "express";
import { deleteUserController, userController } from "../controllers";

export const userRouter = Router();

userRouter.get("/getalldata/:id", userController);

userRouter.post("/adduser", userController);

userRouter.get("/deleteuser/:id", deleteUserController);

userRouter.post("/updateuser/", userController);
