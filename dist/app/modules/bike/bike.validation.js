"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikevalidation = void 0;
const zod_1 = require("zod");
const add = zod_1.z.object({
    body: zod_1.z.object({
        data: zod_1.z.array(zod_1.z.object({
            brand: zod_1.z.string(),
            model: zod_1.z.string(),
            year: zod_1.z.number(),
            customerId: zod_1.z.string(),
        })),
    }),
});
exports.bikevalidation = { add };
