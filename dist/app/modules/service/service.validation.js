"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string(),
        description: zod_1.z.string(),
        status: zod_1.z.string(),
    }),
});
const updateStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            client_1.serviceStatus.COMPLETED,
            client_1.serviceStatus.PENDING,
            client_1.serviceStatus.REJECTED,
            client_1.serviceStatus.IN_PROGRESS,
        ]),
    }),
});
exports.serviceValidation = { create, updateStatus };
