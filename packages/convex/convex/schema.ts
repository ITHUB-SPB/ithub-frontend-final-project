import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    brands: defineTable({ title: v.string() }),
    categories: defineTable({ title: v.string() }),
    characteristics: defineTable({
        title: v.string(),
        measure: v.nullable(v.string())
    }),
    categories_characteristics: defineTable({
        category: v.id("categories"),
        characteristic: v.id("characteristics")
    }),
    products: defineTable({
        brand: v.id("brands"),
        category: v.id("categories"),
        current_price: v.float64(),
        raw_price: v.float64(),
        title: v.string(),
        description: v.nullable(v.string())
    }),
});