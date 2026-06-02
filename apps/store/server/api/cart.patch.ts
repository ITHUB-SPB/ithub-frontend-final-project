import z from "zod";
import { db } from "../database/connection";

const cartUpdateSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().nonnegative(),
});

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event);

  if (!user) {
    return;
  }

  const { 
    productId, 
    quantity 
  } = await readValidatedBody(event, cartUpdateSchema.parse);

  const cartItem = await db
    .selectFrom("carts")
    .innerJoin("products", "products.id", "carts.productId")
    .selectAll()
    .where("carts.customerId", "=", user.id)
    .where("carts.productId", "=", productId)
    .executeTakeFirst();

  if (!cartItem) {
    await db
      .insertInto("carts")
      .values({
        customerId: user.id,
        productId: productId,
        quantity: quantity,
      })
      .execute();

    return;
  }

  if (quantity === 0) {
    await db
      .deleteFrom("carts")
      .where('carts.customerId', '==', user.id)
      .where("carts.productId", "==", cartItem.id)
      .execute();
    return;
  }

  await db
    .updateTable("carts")
    .set({
      quantity,
    })
    .where('carts.customerId', '==', user.id)
    .where("carts.productId", "==", cartItem.id)
    .execute();
});
