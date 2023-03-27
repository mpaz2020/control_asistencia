import { getAll, uploadImage } from '../../controllers/UserController.js'

export default async function (app) {
  app.get('/', getAll)
  app.post('/', uploadImage)
}
