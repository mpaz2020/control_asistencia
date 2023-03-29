export default async function (fastify) {
  fastify.get(
    '/',
    {
      onRequest: [fastify.authenticate],
    },
    async req => req.user
  )
}
