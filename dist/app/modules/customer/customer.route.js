"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("./customer.controller");
const validateRequest_1 = require("../../utils/validateRequest");
const customer_zod_validation_1 = require("./customer.zod.validation");
const customerRouter = express_1.default.Router();
customerRouter.post("/", (0, validateRequest_1.validateRequest)(customer_zod_validation_1.customerValidation.create), customer_controller_1.customerController.createCustomer);
customerRouter.get("/", customer_controller_1.customerController.getAllCustomer);
customerRouter.get("/:customerId", customer_controller_1.customerController.getCustomerById);
customerRouter.patch("/:customerId", (0, validateRequest_1.validateRequest)(customer_zod_validation_1.customerValidation.update), customer_controller_1.customerController.updateCustomerById);
customerRouter.delete("/:customerId", customer_controller_1.customerController.deleteCustomerById);
exports.default = customerRouter;
