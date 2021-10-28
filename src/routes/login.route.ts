import { Router } from "express";
import { loginHandler } from "../controllers";

export const loginRouter = Router();

loginRouter.get("/", loginHandler);

// export loginRouter;
