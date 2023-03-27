import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Cookies } from 'quasar'

const api = axios.create({
  baseURL: process.env.API_URL || `http://${location.hostname}:3000`,
})

const token = Cookies.get('access-token')
if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default boot(({ app, redirect }) => {
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) return redirect('/login')
      throw error
    }
  )
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
