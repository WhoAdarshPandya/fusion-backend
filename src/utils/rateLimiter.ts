import expressRateLimit, { RateLimit } from "express-rate-limit";

export const limiter: RateLimit = expressRateLimit({
  windowMs: 10 * 60 * 1000, // 10mins
  max: 200,
  statusCode: 200,
  message: JSON.stringify({ msg: "You're being rate limited", success: false }),
});
