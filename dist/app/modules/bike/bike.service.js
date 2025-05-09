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
exports.bikeService = void 0;
const client_1 = require("@prisma/client");
const globalErrorHandler_1 = require("../../middleware/globalErrorHandler");
const prisma = new client_1.PrismaClient();
const addBikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.bike.createMany({ data: payload });
    return result;
});
const getAllBikesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.bike.findMany();
    return result;
});
const getBikeByIdFromDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.bike.findUnique({ where: { bikeId } });
    if (!result) {
        throw new globalErrorHandler_1.AppError(404, "Bike not found");
    }
    return result;
});
exports.bikeService = {
    addBikeIntoDB,
    getAllBikesFromDB,
    getBikeByIdFromDB,
};
