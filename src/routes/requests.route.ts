import { Router } from "express";
import {
  addRequestController,
  getRequestsController,
  deleteRequestController,
} from "../controllers";

export const requestRouter = Router();

requestRouter.get("/getrequests/:id", getRequestsController);

requestRouter.post("/addrequest", addRequestController);

requestRouter.get(
  "/deleterequest/:request_master_id/:request_id",
  deleteRequestController
);
