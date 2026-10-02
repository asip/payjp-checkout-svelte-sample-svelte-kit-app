import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({ PUBLIC_PAYJP_DATA_KEY: { public: true, static: true } })
