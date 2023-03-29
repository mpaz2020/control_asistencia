import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { DateTime } from 'luxon'

const __dirname = dirname(fileURLToPath(import.meta.url))

const appDir = dirname(__dirname)
const pump = util.promisify(pipeline)

export async function getAll(req) {
  const { claveAsistencia } = req.query
  const { entities } = this.platformatic
  const [usuario] = await entities.usuario.find({
    where: {
      claveAsistencia: {
        eq: claveAsistencia,
      },
    },
  })
  if (!usuario) {
    return {
      name: '',
      banner: 'ID de asistencia no encontrado',
    }
  }

  const asistencias = await entities.asistencium.find({
    where: {
      usuarioId: {
        eq: usuario?.id,
      },
      fecha: {
        eq: DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
      },
    },
  })

  const tipo = asistencias?.length ? 'Salida' : 'Ingreso'
  if (asistencias && asistencias.length > 1) {
    return {
      name: usuario?.nombre + ' ' + usuario?.apellidos,
      banner: 'UD ya registró salida para hoy',
    }
  }
  await entities.asistencium.save({
    fields: ['usuarioId', 'tipo'],
    input: { usuarioId: usuario?.id, tipo },
  })

  return {
    name: usuario?.nombre + ' ' + usuario?.apellidos,
    banner: tipo + ' registrado ' + new Date().toLocaleTimeString(),
  }
}

export async function uploadImage(req) {
  const data = await req.file()
  const ruta = process.env.PATH_UPLOAD_IMAGE || '/public/storage/images/'
  await pump(data.file, fs.createWriteStream(appDir + ruta + data.filename))
  return { upload: 'completed' }
}
