import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    brands: defineTable({ title: v.string() }),
    categories: defineTable({ title: v.string() }),
    products: defineTable({
        brand_id: v.float64(),
        category_id: v.float64(),
        current_price: v.float64(),
        raw_price: v.float64(),
        summary: v.string(),
        title: v.string(),
    }),
});