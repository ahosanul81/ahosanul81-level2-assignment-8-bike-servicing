"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../../../generated/prisma");
const create = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string(),
        description: zod_1.z.string(),
    }),
});
const updateStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            prisma_1.serviceStatus.COMPLETED,
            prisma_1.serviceStatus.PENDING,
            prisma_1.serviceStatus.REJECTED,
            prisma_1.serviceStatus.IN_PROGRESS,
        ]),
    }),
});
exports.serviceValidation = { create, updateStatus };
