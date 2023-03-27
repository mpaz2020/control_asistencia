import fp from 'fastify-plugin'

/**
 *
 * @param {import('fastify').FastifyInstance} app
 * @param {*} opts
 * @param {Function} done
 */
function controllers(app, _, done) {
  const { db, bcrypt } = app

  app.decorate('controllers', {
    getter() {
      return {}
    },
  })

  done()
}

export default fp(controllers)
