"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerController = void 0;
const catchAcync_1 = require("../../utils/catchAcync");
const customer_service_1 = require("./customer.service");
const createCustomer = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.createCustomerIntoDB(req.body.data);
    res.status(200).json({
        success: true,
        message: "added a customer successfully",
        data: result,
    });
}));
const getAllCustomer = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.getAllCustomerFromDB();
    res.status(200).json({
        success: true,
        message: "All customer fetched successfully",
        data: result,
    });
}));
const getCustomerById = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.getCustomerByIdFromDB(req.params.customerId);
    res.status(200).json({
        success: true,
        message: " customer fetched by id successfully",
        data: result,
    });
}));
const updateCustomerById = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.updateCustomerByIdFromDB(req.params.customerId, req.body);
    res.status(200).json({
        success: true,
        message: "Updated_customer by id successfully",
        data: result,
    });
}));
const deleteCustomerById = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.deleteCustomerByIdFromDB(req.params.customerId);
    res.status(200).json({
        success: true,
        message: "Deleted_customer successfully",
        data: result,
    });
}));
exports.customerController = {
    createCustomer,
    getAllCustomer,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById,
};
