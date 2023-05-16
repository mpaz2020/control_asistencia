import fp from 'fastify-plugin'
import PdfPrinter from 'pdfmake'

import fs from 'fs'

// const fonts = {
//   Roboto: {
//     normal: '../fonts/Roboto-Regular.ttf',
//     bold: '../fonts/Roboto-Medium.ttf',
//     italics: '../fonts/Roboto-Italic.ttf',
//     bolditalics: '../fonts/Roboto-MediumItalic.ttf',
//   },
// }

const fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique',
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic',
  },
  Symbol: {
    normal: 'Symbol',
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats',
  },
}

const docDefinition = {
  content: [
    { text: 'Test', style: 'header' },
    {
      style: 'tableExample',
      table: {
        body: [
          ['1. Hola ', '3. De cómo generar'],
          ['2. Este es un ejemplo', '4. PDFs'],
        ],
      },
    },
    {
      text: 'La librería se llama pdfmake',
      style: 'subheader',
    },
    {
      text: 'Es la librería más popular para esta cuestión con JavaScript!',
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    tableExample: {
      margin: [0, 5, 0, 15],
    },
  },
  defaultStyle: {
    font: 'Helvetica',
  },
}

export default fp(
  async function (fastify, opts, next) {
    const createPdf = async () => {
      const printer = new PdfPrinter(fonts)
      const pdfDoc = printer.createPdfKitDocument(docDefinition)

      // return new Promise((resolve, reject) => {
      // try {
      const chunks = []
      // pdfDoc.on('data', chunk => chunks.push(chunk))
      // pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
      pdfDoc.pipe(fs.createWriteStream('document.pdf'))
      pdfDoc.end()
      // } catch (err) {
      //   reject(err)
      // }
      // })
    }

    const errorPdfHtmlTemplate = error => `
      <h2>There was an error displaying the PDF document.</h2>
      Error message: ${error}`

    fastify.decorate('pdf', {
      createPdf,
      errorPdfHtmlTemplate,
    })

    next()
  },
  {
    name: 'pdf',
  }
)
