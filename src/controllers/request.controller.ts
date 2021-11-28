import { deleteRequest, insertRequest, getAllRequests } from "../db/";
import { RequestHandler, Request, Response } from "express";

export const deleteRequestController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { request_master_id, request_id } = req.params;
  const data = await deleteRequest(request_master_id, request_id);
  console.log(data);
  return res.json({ data });
};

export const getRequestsController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  console.log(id);
  const data = await getAllRequests(id);
  console.log(data);
  return res.json({ data });
};

export const addRequestController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  const data = await insertRequest({
    id,
    date: "a",
    req_for_id: "bb",
    req_id: "030",
    time: "jh",
    user_profile: "sadf",
    username: "saran",
  });
  console.log(data);
  return res.json({ data });
};
