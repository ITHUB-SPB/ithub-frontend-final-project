import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

interface Database {
  brands: BrandsTable;
  categories: CategoriesTable;
  characteristics: CharacteristicsTable;
  products: ProductsTable;
  productsCharacteristics: ProductsCharacteristicsTable;
  carts: CartsTable;
  customers: CustomersTable;
  orders: OrdersTable;
}

const dialect = new SqliteDialect({
  database: new SQLite("./local.sqlite3"),
});

export const db = new Kysely<Database>({
  dialect,
});
