import { Router } from "express";
import {
  deleteUserController,
  updateUserPasswordController,
  userController,
  updateUserDndController,
  updateUserInfoController,
  updateUserNotificationController,
  updateUserProfileController,
} from "../controllers";

export const userRouter = Router();

userRouter.get("/getalldata/:id", userController);

// userRouter.post("/adduser", userController);

userRouter.get("/deleteuser/:id", deleteUserController);

// userRouter.post("/updateuser/", userController);

userRouter.post("/updatepassword", updateUserPasswordController);

userRouter.post("/updatenotification", updateUserNotificationController);

userRouter.post("/updatednd", updateUserDndController);

userRouter.post("/updateprofile", updateUserProfileController);

userRouter.post("/updateinfo", updateUserInfoController);
