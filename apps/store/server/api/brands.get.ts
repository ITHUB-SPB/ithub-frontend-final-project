import { db } from "../database/connection";

export default defineEventHandler(async () => {
  const brands = await db.selectFrom("brands").selectAll().execute();

  for (const brand of brands) {
    const brandProducts = await db
      .selectFrom("products")
      .selectAll()
      .where("products.brandId", "==", brand.id)
      .execute();

    Object.assign(brand, {
      quantity: brandProducts.length,
    });
  }

  return brands;
});
