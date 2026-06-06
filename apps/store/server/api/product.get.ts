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

  const characteristics = await db
    .selectFrom("productsCharacteristics")
    .where('productsCharacteristics.productId', '==', productId)
    .innerJoin(
      'characteristics', 
      'characteristics.id', 
      'productsCharacteristics.characteristicId'
    )
    .select(['value', 'measure', 'title'])
    .execute();

  return {
    ...product,
    characteristics: characteristics.reduce((acc, { value, measure, title }) => ({
      ...acc,
      [title] : {
        value,
        measure
      }
    }), {})
  }
});
