import { internalMutation } from "./_generated/server";
import phoneProduct from '../data/phones/000000004.json' with { type: "json" }

export const seedData = internalMutation(async (ctx) => {
  const {
    raw_price,
    title,
    description,
    category: categoryTitle,
    brand: brandTitle,
    ...characteristics
  } = phoneProduct

  const brand = await ctx.db.query("brands").filter(q => q.eq(q.field('title'), brandTitle)).first()
  const brandId = brand === null ? await ctx.db.insert('brands', { title: brandTitle }) : brand._id

  const category = await ctx.db.query("categories").filter(q => q.eq(q.field('title'), categoryTitle)).first()
  const categoryId = category === null ? await ctx.db.insert('categories', { title: categoryTitle }) : category._id

  ctx.db.insert('products', {
    brand: brandId,
    category: categoryId,
    current_price: raw_price,
    raw_price,
    title,
    description
  })
});
