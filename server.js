import GracefulServer from '@gquittet/graceful-server'
import buildServer from './index.js'
import config from './config/index.js'

const app = buildServer(config)

const gracefulServer = GracefulServer(app.server)

gracefulServer.on(GracefulServer.READY, () => {
  app.log.info('El servidor esta listo')
})

gracefulServer.on(GracefulServer.SHUTTING_DOWN, async () => {
  await app.close()
  app.log.info('El servidor se ha cerrado')
})

gracefulServer.on(GracefulServer.SHUTDOWN, error => {
  app.log.info(`El servidor se ha caido debido a ${error.message || error}`)
})

const main = async function () {
  try {
    app.listen({ port: config.PORT, host: '0.0.0.0' })
    app.ready(async err => {
      if (err) throw err

      gracefulServer.setReady()
      try {
        await app.db.pool.getConnection()
        // console.log(app.printRoutes())
        app.log.info('Conected to DB!')
      } catch (err) {
        app.log.error({
          message: 'Error: No se pudo conectar con la base de datos control_asistencia',
          err,
        })
      }
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main()
