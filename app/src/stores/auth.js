import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { api } from 'boot/axios'
import { PERMISSIONS } from 'src/utils'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: Cookies.get('access-token') || null,
  }),
  getters: {
    isAuthenticated: state => Boolean(state.user),
    isAdmin: state => state.user && state.user.role?.name === 'Administrador',
    hasPermission: state => permission => {
      if (!permission || !state.user) return true
      if (state.user.role.name === 'Administrador') return true
      const roles = PERMISSIONS[permission]
      const isAllowed = roles.includes(state.user.role.name)
      const toAll = roles.includes('*')
      return toAll || isAllowed
    },
  },
  actions: {
    async getUser() {
      try {
        const { data } = await api.get('/api/me')
        this.user = data
      } catch (e) {
        this.user = null
        this.token = null
      }
    },
    async login(credentials) {
      try {
        const graphqlQuery = {
          operationName: 'login',
          query: `query login($username:String){
            users(limit:1,where:{
              username:{
                eq:$username
              },
            })
            {
              id
              name
              username
              role {
                id
                name
              }
              password
              deletedAt
            }
          }`,
          variables: credentials,
        }

        const { data } = await api.post('/api/login', graphqlQuery)
        const { user, token } = data
        this.user = user
        this.token = { token, remember: credentials.remember }
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        Cookies.set('access-token', token)
        return true
      } catch (error) {
        const { status, data } = error.response || error
        if (status === 401) return data
        return error
      }
    },
    async logout() {
      this.user = null
      this.token = null
      Cookies.remove('access-token')
      return true
    },
  },
})
