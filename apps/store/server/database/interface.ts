import { Generated } from 'kysely'
import z from 'zod'

import { brandsSchema, categoriesSchema, characteristicsSchema, productsCharacteristicsSchema, productsSchema, cartsSchema, customersSchema, ordersSchema } from '../schema'

type BrandsTable = z.infer<typeof brandsSchema> & {
    id: Generated<number>
}

type CategoriesTable = z.infer<typeof categoriesSchema> & {
    id: Generated<number>
}

type CharacteristicsTable = z.infer<typeof characteristicsSchema> & {
    id: Generated<number>
}

type ProductsTable = z.infer<typeof productsSchema> & {
    id: Generated<number>
}

type ProductsCharacteristicsTable = z.infer<typeof productsCharacteristicsSchema> & {
    id: Generated<number>,
}

type CartsTable = z.infer<typeof cartsSchema> & {
    id: Generated<number>
}

type CustomersTable = z.infer<typeof customersSchema> & {
    id: Generated<number>
}

type OrdersTable = z.infer<typeof ordersSchema> & {
    id: Generated<number>
}

export interface Database {
    brands: BrandsTable,
    categories: CategoriesTable,
    characteristics: CharacteristicsTable,
    products: ProductsTable,
    productsCharacteristics: ProductsCharacteristicsTable,
    carts: CartsTable,
    customers: CustomersTable,
    orders: OrdersTable
}
