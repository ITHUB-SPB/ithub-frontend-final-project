import z from "zod";
import { idSchema } from "./_common";

export const ordersSchema = z.object({
  id: idSchema,
  customerId: idSchema,
  productId: idSchema,
  quantity: z.number().nonnegative(),
  discount: z.nullable(z.number().nonnegative()),
  bonusCard: z.nullable(z.string().min(4)),
  tax: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
});
