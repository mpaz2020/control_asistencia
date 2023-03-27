import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const appDir = dirname(__dirname)
const pump = util.promisify(pipeline)

export async function getAll() {
  const { entities } = this.platformatic
  const res = await entities.usuario.find()
  console.log(res)
  return res
}

export async function uploadImage(req) {
  const data = await req.file()
  const ruta = process.env.PATH_UPLOAD_IMAGE || '/public/storage/images/'
  await pump(data.file, fs.createWriteStream(appDir + ruta + data.filename))
  return { upload: 'completed' }
}
