import z from "zod";
import { idSchema } from "./_common";

export const customersSchema = z.object({
    id: idSchema,
    phone: z.string().min(10),
    password: z.string().min(6),
    fullName: z.nullable(z.string()),
    address: z.nullable(z.string()),
})