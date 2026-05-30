import { z } from "zod";
import { db } from "../database/connection";

const loginSchema = z.object({
  phone: z.string().min(10),
  password: z.string().min(6),
});

export default defineEventHandler(async (event) => {
  const { phone, password } = await readValidatedBody(event, loginSchema.parse);

  const customer = await db
    .selectFrom("customers")
    .selectAll()
    .where("customers.phone", "==", phone)
    .executeTakeFirst();

  if (!customer) {
    throw createError({
      status: 401,
      message: "Данные некорректны",
    });
  }

  const { password: hashedPassword, ...user } = customer;

  const passwordIsCorrect = await verifyPassword(hashedPassword, password);

  if (!passwordIsCorrect) {
    throw createError({
      status: 401,
      message: "Данные некорректны",
    });
  }

  await setUserSession(event, {
    user,
  });
});
