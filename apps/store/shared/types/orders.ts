import z from "zod";
import type { Generated } from "kysely";

import { ordersSchema } from "../schema/orders";

export type OrdersTable = z.infer<typeof ordersSchema> & {
  id: Generated<number>;
};
