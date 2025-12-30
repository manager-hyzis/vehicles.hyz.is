import { config } from 'dotenv'
import { defineConfig, env } from 'prisma/config'
import { resolve } from 'path'

config({ path: resolve('.env.local') })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})