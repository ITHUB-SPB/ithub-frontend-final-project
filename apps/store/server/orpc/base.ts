import { RequestHeadersPluginContext } from '@orpc/server/plugins'
import { os } from '@orpc/server'
import { getCookie } from '@orpc/server/helpers'

interface ORPCContext extends RequestHeadersPluginContext { }

export const base = os.$context<ORPCContext>()
