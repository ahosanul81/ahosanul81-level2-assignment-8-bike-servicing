import express from "express";
import { serviceController } from "./service.controller";
import { validateRequest } from "../../utils/validateRequest";
import { serviceValidation } from "./service.validation";
const serviceRouter = express.Router();

serviceRouter.post(
  "/create-service",
  validateRequest(serviceValidation.create),
  serviceController.createService
);
serviceRouter.get(
  "/",

  serviceController.getAllServiceRecord
);
serviceRouter.get("/:serviceId", serviceController.getServiceRecordById);
serviceRouter.patch(
  "/update-status/:serviceId",
  validateRequest(serviceValidation.updateStatus),
  serviceController.updateStatus
);
// get services older than 7 days and Have status = "pending" or "in-progress"
serviceRouter.get(
  "/status/:status",
  serviceController.getServiceRecordByStatus
);
export default serviceRouter;
