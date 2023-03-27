import fp from 'fastify-plugin'
import mariadb from 'mariadb'
import mapper from '@platformatic/sql-mapper'
import graphqlPlugin from '@platformatic/sql-graphql'
/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @param {*} options
 * @param {*} done
 */
function plugin(fastify, options, done) {
  const config = Object.assign({}, options.dbOptions)
  const connectionString = `mysql://${config.user}:${config.password}@${config.server}/${config.database}`
  const pool = mariadb.createPool({
    user: config.user,
    password: config.password,
    host: config.server,
    database: config.database,
  })

  fastify.register(mapper, {
    connectionString,
    hooks: {
      user: {
        save: async (originalSave, opts) => {
          // Hash password
          const { input } = opts
          const hash = await fastify.bcrypt.hash(input.password)
          const res = await originalSave({
            ...opts,
            input: {
              ...input,
              password: hash,
            },
          })
          return { ...res, password: null }
        },
        // find: async (originalFind, opts) => {
        //   const res = await originalFind(opts)
        //   return res.map(r => ({ ...r, password: null }))
        // },
      },
    },
  })
  fastify.register(graphqlPlugin, {
    graphiql: true,
    /* ignore: {
      users: {
        password: true,
      },
    }, */
  })

  fastify.decorate(options.instance, { pool, SQL: null })

  fastify.addHook('onClose', async () => {
    pool.off()
    return
  })
  done()
}

export default fp(plugin, {
  name: 'fastify-db',
  dependencies: ['bcrypt'],
})
