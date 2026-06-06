import { z } from "zod";
import { db } from "../database/connection";
import { getValidatedQuery } from "#imports";

const productSchema = z.object({
  productId: z.string().transform(Number).pipe(z.number().int().min(1)),
});

export default defineEventHandler(async (event) => {
  const { productId } = await getValidatedQuery(event, productSchema.parse);

  const product = await db
    .selectFrom("products")
    .selectAll()
    .where('products.id', '==', productId)
    .executeTakeFirst();

  console.log(product)

  return product
});
