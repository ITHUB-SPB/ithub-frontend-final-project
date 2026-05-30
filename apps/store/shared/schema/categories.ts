import z from "zod";
import { idSchema } from "./_common";

export const categoriesSchema = z.object({
  id: idSchema,
  title: z.string().min(2),
  value: z.string().min(2),
  active: z.nullable(z.number().int()),
});
