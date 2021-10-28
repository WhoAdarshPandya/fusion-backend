import { Router } from "express";
import { signUpHandler } from "../controllers";

export const signUpRouter = Router();

signUpRouter.post("/", signUpHandler);
