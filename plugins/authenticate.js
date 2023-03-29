import fp from 'fastify-plugin'

export default fp(async function (fastify, opts) {
  fastify.register(import('@fastify/jwt'), {
    secret: opts.JWT_SECRET,
  })

  fastify.decorate('authenticate', async (req, reply) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})
