import { db } from "./connection";

async function createTables() {
    await db.schema
        .createTable('brands')
        .ifNotExists()
        .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
        .addColumn('title', 'varchar', col => col.notNull())
        .execute()

    await db.schema
        .createTable('categories')
        .ifNotExists()
        .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
        .addColumn('title', 'varchar', col => col.notNull())
        .addColumn('value', 'varchar', col => col.notNull())
        .addColumn('active', 'integer', col => col.defaultTo(0))
        .execute()

    await db.schema
        .createTable('characteristics')
        .ifNotExists()
        .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
        .addColumn('title', 'varchar', col => col.notNull())
        .addColumn('measure', 'varchar')
        .execute()


    await db.schema
        .createTable('products')
        .ifNotExists()
        .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())

        .addColumn('brandId', 'integer')
        .addForeignKeyConstraint(
            'product_brandId_foreign', ['brandId'], 'brands', ['id'],
            (constraint) => constraint.onDelete('cascade')
        )

        .addColumn('categoryId', 'integer')
        .addForeignKeyConstraint(
            'product_categoryId_foreign', ['categoryId'], 'categories', ['id'],
            (constraint) => constraint.onDelete('cascade')
        )

        .addColumn('currentPrice', 'float8', col => col.notNull())
        .addColumn('rawPrice', 'float8', col => col.notNull())

        .addColumn('title', 'varchar', col => col.notNull())
        .addColumn('description', 'text')

        .execute()
}

await createTables()