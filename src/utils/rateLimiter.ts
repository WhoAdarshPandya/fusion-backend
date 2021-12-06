import expressRateLimit, { RateLimit } from "express-rate-limit";

// 10, 200
export const limiter: RateLimit = expressRateLimit({
  windowMs: 10 * 60 * 1000, // 10mins
  max: 2000,
  statusCode: 200,
  message: JSON.stringify({ msg: "You're being rate limited", success: false }),
});
