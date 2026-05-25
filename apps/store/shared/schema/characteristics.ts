import z from "zod";
import { idSchema } from "./_common";

export const characteristicsSchema = z.object({
    id: idSchema,
    title: z.string().min(2),
    measure: z.nullable(z.string().min(1))
})

export const productsCharacteristicsSchema = z.object({
    id: idSchema,
    productId: idSchema,
    characteristicId: idSchema,
    value: z.union([
        z.string().min(2),
        z.number(),
        z.boolean()
    ])
})
