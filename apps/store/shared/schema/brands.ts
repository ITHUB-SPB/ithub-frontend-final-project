import z from "zod";
import { idSchema } from "./_common";

export const brandsSchema = z.object({
  id: idSchema,
  title: z.string().min(2),
});
