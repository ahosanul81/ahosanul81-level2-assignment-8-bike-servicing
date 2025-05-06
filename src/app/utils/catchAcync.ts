import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAcync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};
