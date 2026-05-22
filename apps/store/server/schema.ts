import z from "zod";

const idSchema = z.number().int().positive()

export const brandsSchema = z.object({
    id: idSchema,
    title: z.string().min(2)
})

export const categoriesSchema = z.object({
    id: idSchema,
    title: z.string().min(2)
})

export const characteristicsSchema = z.object({
    id: idSchema,
    title: z.string().min(2),
    measure: z.nullable(z.string().min(1))
})

export const productsCharacteristicsSchema = z.object({
    id: idSchema,
    productId: idSchema,
    characteristicId: idSchema,
    value: z.union([
        z.string().min(2),
        z.number(),
        z.boolean()
    ])
})

export const productsSchema = z.object({
    id: idSchema,
    brandId: idSchema,
    categoryId: idSchema,
    currentPrice: z.float64(),
    rawPrice: z.float64(),
    title: z.string().min(2),
    description: z.nullable(z.string().min(2))
})

export const cartsSchema = z.object({
    id: idSchema,
    customerId: idSchema,
    productId: idSchema,
    quantity: z.number().nonnegative()
})

export const customersSchema = z.object({
    id: idSchema,
    email: z.string().min(2),
    phone: z.string().min(10),
    password: z.string().min(6),
    fullName: z.nullable(z.string()),
    address: z.nullable(z.string()),
})

export const ordersSchema = z.object({
    id: idSchema,
    customerId: idSchema,
    productId: idSchema,
    quantity: z.number().nonnegative(),
    discount: z.nullable(z.number().nonnegative()),
    bonusCard: z.nullable(z.string().min(4)),
    tax: z.number().nonnegative(),
    shipping: z.number().nonnegative()
})
