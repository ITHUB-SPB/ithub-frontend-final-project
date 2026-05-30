import z from "zod";
import { db } from "../database/connection";

const characteristicsSchema = z.object({
  category: z.optional(z.string()),
});

export default defineEventHandler(async (event) => {
  const { category } = await getValidatedQuery(event, characteristicsSchema.parse);

  let query = db
    .selectFrom("productsCharacteristics")
    .distinct()
    .innerJoin("products", "products.id", "productsCharacteristics.productId")
    .innerJoin("categories", "categories.id", "products.categoryId")
    .innerJoin("characteristics", "characteristics.id", "productsCharacteristics.characteristicId")
    .select(["characteristics.title"]);

  if (category) {
    query = query.where("categories.value", "==", category);
  }

  const result = await query.execute();

  for (const item of result) {
    const values = await db
      .selectFrom("productsCharacteristics")
      .distinct()
      .innerJoin(
        "characteristics",
        "characteristics.id",
        "productsCharacteristics.characteristicId",
      )
      .select(({ fn }) => [
        "productsCharacteristics.value",
        fn.count<number>("characteristics.title").distinct().as("quantity"),
      ])
      .where("characteristics.title", "==", item.title)
      .groupBy("productsCharacteristics.value")
      .execute();

    Object.assign(item, { values });
  }

  return result;
});
