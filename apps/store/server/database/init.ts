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

    await db.schema
        .createTable('productsCharacteristics')
        .ifNotExists()
        .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
        .addColumn('productId', 'integer')
        .addForeignKeyConstraint(
            'table_productId_foreign', ['productId'], 'products', ['id'],
            (constraint) => constraint.onDelete('cascade')
        )
        .addColumn('characteristicId', 'integer')
        .addForeignKeyConstraint(
            'table_characteristicId_foreign', ['characteristicId'], 'characteristics', ['id'],
            (constraint) => constraint.onDelete('cascade')
        )
        .addColumn('value', 'varchar', col => col.notNull())
        .execute()

    await db.schema
        .createTable('customers')
        .ifNotExists()
        .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
        .addColumn('phone', 'varchar', col => col.notNull())
        .addColumn('password', 'varchar', col => col.notNull())
        .addColumn('fullName', 'varchar')
        .addColumn('address', 'varchar')
}

await createTables()