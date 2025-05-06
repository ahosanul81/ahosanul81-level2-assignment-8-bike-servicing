import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
export class AppError {
  public statusCode: number;
  public message: string;
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

type TGlobalError = {
  message: string;
  statusCode: number;
  errorSource: TErrorSource[];
  stack?: string;
};
type TErrorSource = {
  path: string | number;
  message: string;
};
export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = "Something went wrong";
  let statusCode = 500;
  let errorSource: TErrorSource[] = [{ path: "", message: "" }];

  if (error instanceof AppError) {
    message = error.message;
    statusCode = error.statusCode;
    errorSource = [{ path: "", message: error.message }];
  } else if (error instanceof ZodError) {
    const handleZodErrors: TErrorSource[] = error?.issues?.map(
      (issue: ZodIssue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      })
    );
    statusCode = 400;
    message = "zodError";
    errorSource = handleZodErrors;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.node === "development" ? error.stack : "",
  });
};
