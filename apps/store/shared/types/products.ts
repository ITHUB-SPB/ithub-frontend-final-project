import z from "zod";
import type { Generated } from "kysely";

import { productsSchema } from "../schema/products";

export type ProductsTable = z.infer<typeof productsSchema> & {
  id: Generated<number>;
};

export type Product = z.infer<typeof productsSchema>;
