import { join } from 'desm'
import Fastify from 'fastify'
import autoload from '@fastify/autoload'
import commonSchemas from './schemas/index.js'

function buildServer(config) {
  const envToLogger = {
    development: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
    production: true,
    test: false,
  }
  const opts = {
    ...config,
    logger: envToLogger[config.NODE_ENV] ?? {
      level: config.LOG_LEVEL,
    },
    disableRequestLogging: config.DISABLE_REQUEST_LOGGING,
    socketOptions: {
      cors: '*',
    },
    instance: 'db',
    dbOptions: {
      database: config.MARIADB_DATABASE,
      server: config.MARIADB_HOST,
      user: config.MARIADB_USERNAME,
      password: config.MARIADB_PASSWORD,
      requestTimeout: 300000,
      options: {
        useUTC: true,
        encrypt: false,
      },
    },
  }

  const fastify = Fastify(opts)

  fastify.addSchema(commonSchemas)
  // SWAGGER
  fastify.register(import('@fastify/swagger'))

  fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    openapi: {
      openapi: '3.0.3',
      info: {
        title: 'CHIRI API',
        description: 'Chiri',
        contact: {
          name: 'TGI Ingeniería',
          url: 'https://www.tgiperu.com',
          email: 'iot@tgiperu.com',
        },
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor desarrollo',
        },
        {
          url: 'http://10.74.70.142:3000',
          description: 'Servidor producción',
        },
      ],
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      components: {
        securitySchemes: {
          Autenticación: {
            type: 'http',
            description:
              'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}".',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ Autenticación: [] }],
    },
    uiConfig: {
      ocExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: header => header,
    exposeRoute: true,
    hideUntagged: true,
  })

  fastify.register(import('@fastify/cors'))
  fastify.register(import('@fastify/formbody'))
  fastify.register(import('@fastify/multipart'))
  fastify.register(import('@fastify/static'), {
    root: join(import.meta.url, '/public'),
  })

  fastify.setNotFoundHandler((req, res) => {
    if (req.raw.url && req.raw.url.startsWith('/api')) {
      return res.status(404).send({
        success: false,
        error: {
          kind: 'user_input',
          message: 'Not Found',
        },
      })
    }
    res.status(200).sendFile('index.html')
  })

  fastify.register(autoload, {
    dir: join(import.meta.url, 'plugins'),
    options: opts,
  })

  //fastify.register(import('./events/index.mjs'), { ...opts, logLevel: 'debug' })
  fastify.register(import('./controllers/index.js'), opts)

  fastify.register(autoload, {
    dir: join(import.meta.url, 'routes'),
    options: Object.assign({ prefix: '/api' }, opts),
  })
  fastify.log.info('Fastify se ha iniciado corectamente!')

  return fastify
}

export default buildServer
