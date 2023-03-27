import { join } from 'desm'
import envSchema from 'env-schema'
import S from 'fluent-json-schema'

const schema = S.object()
  .prop('JWT_SECRET', S.string().required())
  .prop('PORT', S.integer().default(3000))
  .prop('LOG_LEVEL', S.string().default('info'))
  .prop('DISABLE_REQUEST_LOGGING', S.boolean().default(false))
  .prop('PRETTY_PRINT', S.string().default(true))
  .prop('HASH_FACTOR', S.integer().default(12))
  .prop('MARIADB_HOST', S.string().default('localhost'))
  .prop('MARIADB_DATABASE', S.string().required())
  .prop('MARIADB_USERNAME', S.string().required())
  .prop('MARIADB_PASSWORD', S.string().required())
  .prop('NODE_ENV', S.string().default('production'))

export default envSchema({
  schema,
  dotenv: { path: join(import.meta.url, '../.env') },
})
