import { Model, model, Schema } from "mongoose";
import { Requests } from "./requests.interface";

const RequestSchema: Schema<Requests> = new Schema<Requests>({
  request_id: { type: String, required: true },
  requests: {
    type: [
      {
        req_id: String,
        req_by_id: String,
        req_for_id: String,
        date: String,
        time: String,
        username: String,
        user_profile: String,
      },
    ],
    required: true,
    default: [],
  },
});

export const requestsModel: Model<Requests> = model<Requests>(
  "request",
  RequestSchema
);
