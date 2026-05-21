import { createRouterClient } from "@orpc/server"
import { router } from "~~/server/orpc/router"


export default defineNuxtPlugin((nuxt) => {
    const event = useRequestEvent()

    const client = createRouterClient(router, {
        context: {
            // headers: event?.headers
        },
    })

    return {
        provide: {
            client,
        },
    }
})