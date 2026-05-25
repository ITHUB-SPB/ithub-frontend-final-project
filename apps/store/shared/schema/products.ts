import z from "zod";
import { idSchema } from "./_common";

export const productsSchema = z.object({
    id: idSchema,
    brandId: idSchema,
    categoryId: idSchema,
    currentPrice: z.float64(),
    rawPrice: z.float64(),
    title: z.string().min(2),
    description: z.nullable(z.string().min(2))
})
