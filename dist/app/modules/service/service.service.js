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
exports.service = void 0;
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler_1 = require("../../middleware/globalErrorHandler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    // const bikeIds = payload?.map(
    //   (item: { bikeId: string; description: string }) => {
    //     return item.bikeId;
    //   }
    // );
    // const existingBikeIdsInDB = await prisma.bike.groupBy({
    //   by: ["bikeId"],
    //   where: {
    //     bikeId: {
    //       in: bikeIds,
    //     },
    //   },
    // });
    // const existingBikeIds = existingBikeIdsInDB?.map(
    //   (item: { bikeId: string }) => {
    //     return item.bikeId;
    //   }
    // );
    // if (!existingBikeIds.includes(bikeIds)) {
    // }
    // console.log(existingBikeIds);
    // if (!isExistBike) {
    //   throw new AppError(404, "Selected Bike not found");
    // }
    try {
        const result = yield prisma.service.createMany({ data: payload });
        return result;
    }
    catch (error) {
        throw new globalErrorHandler_1.AppError(400, error.message);
    }
});
const getAllServiceRecordFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.findMany({ include: { bike: true } });
    return result;
});
const getServiceRecordByIdFromDB = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(serviceId);
    const isExistService = yield prisma.service.findUnique({
        where: { serviceId },
    });
    if (!isExistService) {
        throw new globalErrorHandler_1.AppError(404, "Selected service not found");
    }
    const result = yield prisma.service.findUnique({
        where: { serviceId },
        include: { bike: true },
    });
    return result;
});
const updateStatusIntoDB = (serviceId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistService = yield prisma.service.findUnique({
        where: { serviceId },
    });
    if (!isExistService) {
        throw new globalErrorHandler_1.AppError(404, "Selected service not found");
    }
    console.log(isExistService.status);
    if (isExistService.status === "COMPLETED" ||
        isExistService.status === "REJECTED") {
        throw new globalErrorHandler_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, isExistService.status === "COMPLETED" || "REJECTED"
            ? ` Selected service already ${status}`
            : ` Selected service  ${status}`);
    }
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const updateStatus = yield transactionClient.service.update({
            where: { serviceId },
            data: {
                status: status,
            },
            include: { bike: true },
        });
        const updateDate = yield transactionClient.$queryRaw `UPDATE "Service"
        SET "completionDate" = NOW()
        WHERE "serviceId" = ${serviceId}`;
        return updateStatus;
    }));
    return result;
});
const getServiceRecordByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    if ((status && status.toUpperCase() === "COMPLETED") ||
        status.toUpperCase() === "REJECTED") {
        throw new globalErrorHandler_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "This route is only for pending or IN_PROGRESS services");
    }
    const pendingOrInProgressService = yield prisma.service.findMany({
        where: {
            status: status.toUpperCase(),
        },
        orderBy: { serviceDate: "desc" },
        take: 1,
        include: { bike: true },
    });
    const result = yield prisma.service.findMany({
        where: {
            OR: [{ status: "PENDING" }, { status: "IN_PROGRESS" }],
        },
        orderBy: { serviceDate: "desc" },
        include: { bike: true },
    });
    return result;
});
exports.service = {
    createServiceIntoDB,
    getAllServiceRecordFromDB,
    getServiceRecordByIdFromDB,
    updateStatusIntoDB,
    getServiceRecordByStatus,
};
