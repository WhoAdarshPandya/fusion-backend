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
  const { id, name, req_by_id, req_for_id, req_id, username, user_profile } =
    req.body;
  const data = await insertRequest({
    id,
    date: "a",
    req_for_id,
    req_id,
    time: "jh",
    user_profile,
    username,
    name,
    req_by_id,
  });
  console.log(data);
  return res.json({ data });
};
