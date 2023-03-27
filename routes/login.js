import errors from 'http-errors'
import S from 'fluent-json-schema'

const schema = {
  summary: 'Login into system',
  body: S.object()
    .prop('username', S.string().required())
    .prop('password', S.string().required())
    .prop('verify', S.boolean()),
  response: {
    200: S.description('Successfull request').oneOf([
      S.object()
        .prop('user', S.ref('app/schemas#/definitions/userSchema'))
        .prop('token', S.string().required()),
      S.boolean().required(),
    ]),
  },
}

export default async function (fastify) {
  const { jwt, inject } = fastify
  fastify.post('/login', async function (req) {
    const { password, verify = false } = req.body.variables

    const res = await inject({
      method: 'POST',
      url: '/graphql',
      body: req.body,
    })
    const result = await res.json()
    const user = result.data.users[0]

    if (!user) {
      if (verify) return false
      throw errors.Unauthorized('Credenciales no válidas')
    }
    if (user.deleted_at) throw errors.Forbidden('El usuario ingresado no tiene acceso al servidor.')

    const match = await req.bcryptCompare(password, user.password)

    if (!match) {
      if (verify) return false
      throw errors.Unauthorized('Credenciales no válidas')
    }

    if (verify) return true

    delete user.password
    return { user, token: jwt.sign(user) }
  })
}
