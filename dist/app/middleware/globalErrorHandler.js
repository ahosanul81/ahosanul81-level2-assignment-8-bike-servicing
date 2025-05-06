"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.AppError = void 0;
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
class AppError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const globalErrorHandler = (error, req, res, next) => {
    // console.log(error);
    var _a;
    let message = "Something went wrong";
    let statusCode = 500;
    let errorSource = [{ path: "", message: "" }];
    if (error instanceof AppError) {
        message = error.message;
        statusCode = error.statusCode;
        errorSource = [{ path: "", message: error.message }];
    }
    else if (error instanceof zod_1.ZodError) {
        const handleZodErrors = (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => ({
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }));
        statusCode = 400;
        message = "zodError";
        errorSource = handleZodErrors;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config_1.default.node === "development" ? error.stack : "",
    });
};
exports.globalErrorHandler = globalErrorHandler;
