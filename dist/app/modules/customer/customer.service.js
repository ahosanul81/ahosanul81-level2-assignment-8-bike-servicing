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
exports.customerService = void 0;
const client_1 = require("@prisma/client");
const globalErrorHandler_1 = require("../../middleware/globalErrorHandler");
const prisma = new client_1.PrismaClient();
const createCustomerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.customer.create({ data: payload });
        return result;
    }
    catch (error) {
        throw new globalErrorHandler_1.AppError(500, error.message);
    }
});
const getAllCustomerFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.customer.findMany();
    return result;
});
const getCustomerByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.customer.findUnique({
        where: { customerId: id },
    });
    if (!result) {
        throw new globalErrorHandler_1.AppError(404, "Customer not found");
    }
    return result;
});
const updateCustomerByIdFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCustomer = yield prisma.customer.findUnique({
        where: { customerId: id },
    });
    if (!isExistCustomer) {
        throw new globalErrorHandler_1.AppError(404, "Customer not found");
    }
    const result = yield prisma.customer.update({
        where: { customerId: id },
        data: payload,
    });
    return result;
});
const deleteCustomerByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCustomer = yield prisma.customer.findUnique({
        where: { customerId: id },
    });
    if (!isExistCustomer) {
        throw new globalErrorHandler_1.AppError(404, "Customer not found");
    }
    const result = yield prisma.customer.delete({
        where: { customerId: id },
    });
    return result;
});
exports.customerService = {
    createCustomerIntoDB,
    getAllCustomerFromDB,
    getCustomerByIdFromDB,
    updateCustomerByIdFromDB,
    deleteCustomerByIdFromDB,
};
