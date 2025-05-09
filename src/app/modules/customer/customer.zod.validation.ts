import { z } from "zod";

const create = z.object({
  body: z.object({
    data: z.array(
      z.object({
        name: z.string().max(20),
        email: z.string().email(),
        phone: z.string().max(20),
      })
    ),
  }),
});
const update = z.object({
  body: z.object({
    name: z.string().max(20),
    phone: z.string().max(20),
  }),
});

export const customerValidation = { create, update };
