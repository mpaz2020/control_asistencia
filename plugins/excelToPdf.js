import fp from 'fastify-plugin'
import fs from 'fs'
import { promisify } from 'util'
import libre from 'libreoffice-convert'
import path from 'path'

const libreConvert = promisify(libre.convert)

export default fp(async function (fastify, opts, next) {
  const create = async () => {
    const ext = '.pdf'
    const inputPath = path.join(process.cwd(), '/resources/PlantillaReportes.xlsx')
    const outputPath = path.join(process.cwd(), `/public/reports/PlantillaReportes${ext}`)

    // Read file
    const docxBuf = fs.readFileSync(inputPath)

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
    // let pdfBuf = await libreConvert(docxBuf, ext, undefined)

    libre.convert(docxBuf, ext, undefined, (err, done) => {
      if (err) {
        return console.log(`Error converting file: ${err}`)
      }

      // Here in done you have pdf file which you can save or transfer in another stream
      fs.writeFileSync(outputPath, done)
    })

    // Here in done you have pdf file which you can save or transfer in another stream
    // fs.writeFileSync(outputPath, pdfBuf)

    return { outputPath }
  }

  // fastify.decorate('pdf', { create })

  next()
})
