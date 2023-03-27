import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'stores/auth'

const whiteList = ['/login', '/asistencia', '/auth-redirect']

export default boot(async ({ router }) => {
  const authStore = useAuthStore()
  // await authStore.getUser()
  // router.beforeEach((to, from, next) => {
  //   const isAuthenticated = authStore.isAuthenticated
  //   if (to.meta.requiresAuth && !isAuthenticated) return next({ path: '/asistencia' })
  //   if (isAuthenticated && whiteList.includes(to.path)) return next(from)
  //   return next()
  // })
})
