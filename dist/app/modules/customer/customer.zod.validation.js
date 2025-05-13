"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().max(20),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string().max(20),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().max(20),
        phone: zod_1.z.string().max(20),
    }),
});
exports.customerValidation = { create, update };
