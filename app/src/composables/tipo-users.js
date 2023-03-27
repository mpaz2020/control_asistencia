import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
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
      operationName: 'tipousuario',
      query: `query tipousuario {
        tipousuario(
          limit: 100          
        ) {
          id
          nombre
          descripcion          
          createdAt
        }
      }`,
    }

    const { data } = await api.post('/graphql', graphqlQuery)
    const { tipousuario } = data.data
    users.value = tipousuario ?? []
  }

  const onSubmit = async () => {
    if (!user.value.nombre) {
      return $q.notify({ message: 'Ingrese datos faltantes', type: 'negative' })
    }

    const graphqlQuery = {
      operationName: 'createTipousuario',
      query: `mutation createTipousuario($user:TipousuarioInput!){
          saveTipousuario(input:$user){
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
    router.push('/tipo-usuario/new')
  }

  const onDelete = userToDelete => {
    $q.dialog({
      title: 'Confirmar',
      message: 'Esta acción eliminará el tipo de usuario seleccionado. ¿Está seguro?',
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      const graphqlQuery = {
        operationName: 'eliminarTipousuario',
        query: `mutation eliminarTipousuario($id:ID!){
          deleteTipousuario(
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
        return $q.notify({ message: 'Tipo de usuario eliminado con exito', type: 'positive' })
      }
      $q.notify({ message: 'Error al eliminar tipo de usuario', type: 'negative' })
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
