import z from "zod";
import { idSchema } from "./_common";

export const cartsSchema = z.object({
  id: idSchema,
  customerId: idSchema,
  productId: idSchema,
  quantity: z.number().nonnegative(),
});
