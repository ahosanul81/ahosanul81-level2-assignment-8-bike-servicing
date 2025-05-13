import { serviceStatus } from "@prisma/client";
import { z } from "zod";

const create = z.object({
  body: z.object({
    bikeId: z.string(),
    description: z.string(),
    status: z.string(),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([
      serviceStatus.COMPLETED,
      serviceStatus.PENDING,
      serviceStatus.REJECTED,
      serviceStatus.IN_PROGRESS,
    ]),
  }),
});

export const serviceValidation = { create, updateStatus };
