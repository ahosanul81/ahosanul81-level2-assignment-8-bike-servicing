"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const validateRequest_1 = require("../../utils/validateRequest");
const service_validation_1 = require("./service.validation");
const serviceRouter = express_1.default.Router();
serviceRouter.post("/create-service", (0, validateRequest_1.validateRequest)(service_validation_1.serviceValidation.create), service_controller_1.serviceController.createService);
serviceRouter.get("/", service_controller_1.serviceController.getAllServiceRecord);
serviceRouter.get("/:serviceId", service_controller_1.serviceController.getServiceRecordById);
serviceRouter.patch("/update-status/:serviceId", (0, validateRequest_1.validateRequest)(service_validation_1.serviceValidation.updateStatus), service_controller_1.serviceController.updateStatus);
// get services older than 7 days and Have status = "pending" or "in-progress"
serviceRouter.get("/status/:status", service_controller_1.serviceController.getServiceRecordByStatus);
exports.default = serviceRouter;
