import S from 'fluent-json-schema'

const schema = {
  response: {
    200: S.ref('app/schemas#/definitions/userSchema'),
  },
}

export default async function (fastify) {
  fastify.get(
    '/',
    {
      onRequest: [fastify.authenticate],
    },
    async req => req.user
  )
}
