import type { JwtPayload } from "jsonwebtoken";
export const TAuthUser = {
    id: 1,
    role: "contributor"
}
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | typeof TAuthUser;
    }
  }
}