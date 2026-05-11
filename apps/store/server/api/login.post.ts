import { z } from "zod";
import { api } from "@repo/convex/api";

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export default defineEventHandler(async (event) => {
    const {
        email,
        password
    } = await readValidatedBody(
        event,
        loginSchema.parse
    )

    // serverConvexQuery(event, api.)
})