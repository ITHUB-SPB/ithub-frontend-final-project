import { RPCHandler } from '@orpc/server/fetch'
import { RequestHeadersPlugin } from '@orpc/server/plugins'
import { onError } from '@orpc/server'
import { router } from '~~/server/orpc/router'

const handler = new RPCHandler(router, {
    plugins: [
        new RequestHeadersPlugin()
    ],
    interceptors: [
        onError((error) => {
            console.error(error)
        }),
    ],
})

export default defineEventHandler(async (event) => {
    const request = toWebRequest(event)

    const { response } = await handler.handle(request, {
        prefix: '/rpc',
        context: { reqHeaders: event.headers }, // Provide initial context if needed
    })

    if (response) {
        return response
    }

    setResponseStatus(event, 404, 'Not Found')

    return 'Not found'
})