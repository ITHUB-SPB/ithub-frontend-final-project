import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    brands: defineTable({ title: v.string() }),
    categories: defineTable({ title: v.string() }),
    products: defineTable({
        brand_id: v.id("brands"),
        category_id: v.id("categories"),
        current_price: v.float64(),
        raw_price: v.float64(),
        title: v.string(),
    }),
});