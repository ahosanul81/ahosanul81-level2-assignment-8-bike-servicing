import express from "express";
import { customerController } from "./customer.controller";
import { validateRequest } from "../../utils/validateRequest";
import { customerValidation } from "./customer.zod.validation";

const customerRouter = express.Router();

customerRouter.post(
  "/create-customer",
  validateRequest(customerValidation.create),
  customerController.createCustomer
);
customerRouter.get("/", customerController.getAllCustomer);
customerRouter.get("/:customerId", customerController.getCustomerById);
customerRouter.patch(
  "/:customerId",
  validateRequest(customerValidation.update),
  customerController.updateCustomerById
);
customerRouter.delete("/:customerId", customerController.deleteCustomerById);

export default customerRouter;
