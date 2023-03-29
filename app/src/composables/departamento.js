import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const user = ref({})
const editMode = ref(false)
const users = ref([])
const filter = ref('')

export default function () {
  const $q = useQuasar()

  const router = useRouter()

  const getUsers = async () => {
    const graphqlQuery = {
      operationName: 'departamento',
      query: `query departamento {
        departamento {
          id
          nombre
          descripcion          
          createdAt
        }
      }`,
    }

    const { data } = await api.post('/graphql', graphqlQuery)
    const { departamento } = data.data
    users.value = departamento ?? []
  }

  const onSubmit = async () => {
    if (!user.value.nombre) {
      return $q.notify({ message: 'Ingrese datos faltantes', type: 'negative' })
    }

    const graphqlQuery = {
      operationName: 'createDepartamento',
      query: `mutation createDepartamento($user:DepartamentoInput!){
          saveDepartamento(input:$user){
            nombre
            descripcion
          }
        }`,
      variables: {
        user: user.value,
      },
    }
    let res = await api.post('/graphql', graphqlQuery)

    if (res.status || res.data) {
      await getUsers()
      $q.notify({ message: res.message || 'Usuario guardado con exito', type: 'positive' })
      onReset()
      return
    }
    $q.notify({ message: 'Error al guardar usuario', type: 'negative' })
  }

  const onReset = () => {
    user.value = {}
    editMode.value = false
  }

  const onEdit = userToEdit => {
    user.value = userToEdit
    editMode.value = true
    router.push('/departamento/new')
  }

  const onDelete = userToDelete => {
    $q.dialog({
      title: 'Confirmar',
      message: 'Esta acción eliminará el departamento seleccionado. ¿Está seguro?',
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      const graphqlQuery = {
        operationName: 'eliminarDepartamento',
        query: `mutation eliminarDepartamento($id:ID!){
          deleteDepartamento(
            where:{
              id:{
                eq:$id
              }
            }
          ){
            nombre
            descripcion
            createdAt
          }
        }`,
        variables: {
          id: userToDelete?.id,
        },
      }
      let { data } = await api.post('/graphql', graphqlQuery)
      if (data) {
        getUsers()
        return $q.notify({ message: 'departamento eliminado con exito', type: 'positive' })
      }
      $q.notify({ message: 'Error al eliminar departamento', type: 'negative' })
    })
  }

  return {
    user,
    editMode,
    onSubmit,
    onReset,
    onEdit,
    onDelete,
    getUsers,
    users,
    filter,
  }
}
