import { z } from "zod";

const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export default defineEventHandler(async (event) => {
    const {
        email,
        password
    } = await readValidatedBody(
        event,
        registerSchema.parse
    )

    // const customer = await serverConvexQuery(event, api.customers.getByEmail, { email })

    // if (customer !== null) {
    //     throw createError({
    //         status: 401,
    //         message: 'Пользователь уже существует'
    //     })
    // }

    // try {
    //     await serverConvexMutation(event, api.customers.create, { email, password })
    // } catch (error) {
    //     throw createError({
    //         status: 400,
    //         message: 'Ошибка при регистрации'
    //     })
    // }

})