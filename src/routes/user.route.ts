import { Router } from "express";
import { userController } from "../controllers";

export const userRouter = Router();

userRouter.get("/getalldata/:id", userController);

// export loginRouter;
