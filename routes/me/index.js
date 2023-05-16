import errors from 'http-errors'
export default async function (fastify) {
  fastify.get(
    '/',
    {
      onRequest: [fastify.authenticate],
    },
    async function (req) {
      const { entities } = this.platformatic
      const [user] = await entities.usuario.find({
        where: {
          id: {
            eq: req.user.id,
          },
        },
      })

      if (!user) {
        throw errors.Unauthorized('Sesión expirada!')
      }
      return req.user
    }
  )
}
