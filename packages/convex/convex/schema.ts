import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    brands: defineTable({ title: v.string() }),
    categories: defineTable({ title: v.string() }),
    characteristics: defineTable({
        title: v.string(),
        measure: v.nullable(v.string())
    }),
    products_characteristics: defineTable({
        product: v.id("products"),
        characteristic: v.id("characteristics"),
        value: v.nullable(v.string())
    }),
    products: defineTable({
        brand: v.id("brands"),
        category: v.id("categories"),
        current_price: v.float64(),
        raw_price: v.float64(),
        title: v.string(),
        description: v.nullable(v.string())
    }),
    carts: defineTable({
        customer: v.id("customers"),
        product: v.id("products"),
        quantity: v.number()
    }),
    customers: defineTable({
        email: v.string(),
        phone: v.string(),
        password: v.string(),
        full_name: v.nullable(v.string()),
        address: v.nullable(v.string()),
    }),
    orders: defineTable({
        customer: v.id("customers"),
        product: v.id("products"),
        quantity: v.number(),
        discount: v.nullable(v.number()),
        bonusCard: v.nullable(v.number()),
        tax: v.number(),
        shipping: v.number()
    })
});