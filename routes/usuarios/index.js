import {
  getAll,
  uploadImage,
  exportToExcel,
  exportToPdf,
} from '../../controllers/UserController.js'

export default async function (app) {
  app.get('/', getAll)
  app.post('/', uploadImage)
  app.get('/export/xlsx', exportToExcel)
  app.get('/export/pdf', async (req, res) => {
    try {
      app.pdf.createPdf()
      // res.setHeader('Content-disposition', 'attachment; filename=report.pdf')
      // res.type('pdf').send(binaryResult)
      return true
    } catch (err) {
      console.log(err)
      return false
      // res.send(app.pdf.errorPdfHtmlTemplate(err.message))
    }
  })
}
