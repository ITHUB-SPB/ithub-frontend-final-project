import z from "zod";
import { type Generated } from "kysely";

import { brandsSchema } from "../schema/brands";

export type BrandsTable = z.infer<typeof brandsSchema> & {
  id: Generated<number>;
};
