import { RPCLink } from "@orpc/client/fetch"
import { createORPCClient } from "@orpc/client"
import { type RouterClient } from "@orpc/server"
import { router } from "~~/server/orpc/router"

export default defineNuxtPlugin(() => {
    const link = new RPCLink({
        url: `${window.location.origin}/rpc`,
        headers: () => ({}),
    })

    const client: RouterClient<typeof router> = createORPCClient(link)

    return {
        provide: {
            client,
        },
    }
})