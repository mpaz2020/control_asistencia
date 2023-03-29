import errors from 'http-errors'

export default async function (app) {
  const { jwt } = app
  app.post('/login', async function (req) {
    const { usuario, claveIngreso } = req.body
    const { entities } = this.platformatic
    const [user] = await entities.usuario.find({
      where: {
        usuario: {
          eq: usuario,
        },
        claveIngreso: {
          eq: claveIngreso,
        },
      },
    })

    if (!user) {
      throw errors.Unauthorized('Credenciales no válidas')
    }
    if (!user.estado) throw errors.Forbidden('El usuario ingresado no tiene acceso al servidor.')

    const match = claveIngreso === user.claveIngreso
    // await req.bcryptCompare(password, user.password)

    if (!match) {
      throw errors.Unauthorized('Credenciales no válidas')
    }

    delete user.claveIngreso
    return { user, token: jwt.sign(user) }
  })
}
