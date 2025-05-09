import { z } from "zod";

const add = z.object({
  body: z.object({
    data: z.array(
      z.object({
        brand: z.string(),
        model: z.string(),
        year: z.number(),
        customerId: z.string(),
      })
    ),
  }),
});

export const bikevalidation = { add };
