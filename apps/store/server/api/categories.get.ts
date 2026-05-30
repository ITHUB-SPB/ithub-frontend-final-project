import { db } from "../database/connection";

export default defineEventHandler(async () => {
  return await db.selectFrom("categories").selectAll().execute();
});
