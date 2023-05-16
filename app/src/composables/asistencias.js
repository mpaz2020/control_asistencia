import { ref } from 'vue'
import { api } from 'src/boot/axios'

import { date } from 'quasar'
import { FORMATO_FECHA } from '../utils'
const { formatDate, extractDate, endOfDate } = date

const user = ref(null)
const users = ref([])
const usersFilter = ref([])
const filter = ref('')
const loading = ref(false)

const dateSelection = ref({
  from: formatDate(new Date(), `${FORMATO_FECHA}`),
  to: formatDate(endOfDate(new Date(), 'month'), `${FORMATO_FECHA}`),
})

export default function () {
  const getUsers = async () => {
    loading.value = true
    const graphqlQuery = {
      operationName: 'getAsistencias',
      query: `query getAsistencias{
        asistencia{
          id
          usuario{
            id
            nombre
            apellidos
            usuario        
            claveIngreso
            claveAsistencia
            departamento {
              id
              nombre
              descripcion
              createdAt
            }
          }
          tipo
          fecha
          createdAt
          
        }
      }`,
    }

    const { data } = await api.post('/graphql', graphqlQuery)
    const { asistencia } = data.data
    users.value = asistencia ? asistencia.map(a => ({ ...a, aproved: true })) : []
    loading.value = false
  }

  const getUsersByFilter = async () => {
    loading.value = true
    const graphqlQuery = {
      operationName: 'getAsistencias',
      query: `query getAsistencias ($from:Date,$to:Date,$user_id:ID){
        asistencia (
          where:{
            usuarioId:{
              eq:$user_id
            }
            fecha:{
              gte:$from
              lte:$to
            }
          }
        ){
          id
          usuario{
            id
            nombre
            apellidos
            usuario        
            claveIngreso
            claveAsistencia
            departamento {
              id
              nombre
              descripcion
              createdAt
            }
          }
          tipo
          fecha
          createdAt
          
        }
      }`,
      variables: {
        user_id: user.value ? user.value : null,
        from: formatDate(extractDate(dateSelection.value.from, FORMATO_FECHA), 'YYYY-MM-DD'),
        to: formatDate(extractDate(dateSelection.value.to, FORMATO_FECHA), 'YYYY-MM-DD'),
      },
    }

    const { data } = await api.post('/graphql', graphqlQuery)
    const { asistencia } = data.data
    usersFilter.value = asistencia ? asistencia.map(a => ({ ...a, aproved: true })) : []
    loading.value = false
  }

  return {
    user,
    getUsers,
    getUsersByFilter,
    usersFilter,
    users,
    filter,
    loading,
    dateSelection,
  }
}
