import { Response, NextFunction } from "express";
import { AppError } from "./error.middleware";
import { AuthenticatedRequest } from "../types";

export function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  // TODO: JWT 검증 로직 구현
  // const token = req.headers.authorization?.split(" ")[1];
  // if (!token) throw new AppError(401, "Unauthorized");
  // req.user = verifyToken(token);
  next();
}
