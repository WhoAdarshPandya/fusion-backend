"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/getalldata/:id", controllers_1.userController);
exports.userRouter.get("/deleteuser/:id", controllers_1.deleteUserController);
exports.userRouter.post("/updatepassword", controllers_1.updateUserPasswordController);
exports.userRouter.post("/updatenotification", controllers_1.updateUserNotificationController);
exports.userRouter.post("/updatednd", controllers_1.updateUserDndController);
exports.userRouter.post("/updateprofile", controllers_1.updateUserProfileController);
exports.userRouter.post("/updateinfo", controllers_1.updateUserInfoController);
//# sourceMappingURL=user.route.js.map