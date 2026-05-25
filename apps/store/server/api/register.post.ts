import { z } from "zod";
import { db } from "../database/connection";

const registerSchema = z.object({
    phone: z.string().min(10),
    password: z.string().min(6)
})

export default defineEventHandler(async (event) => {
    const {
        phone,
        password
    } = await readValidatedBody(
        event,
        registerSchema.parse
    )

    const existingAccount = await db
        .selectFrom('customers')
        .where('customers.phone', '==', phone)
        .executeTakeFirst()

    if (existingAccount !== null) {
        throw createError({
            status: 401,
            message: 'Пользователь уже существует'
        })
    }

    try {
        await db.insertInto('customers').values({
            phone,
            password: hashPassword(password)
        }).execute()
    } catch (error) {
        throw createError({
            status: 400,
            message: 'Ошибка при регистрации'
        })
    }
})