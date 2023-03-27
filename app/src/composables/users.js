import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import useIndex from 'src/composables'

const user = ref({})
const editMode = ref(false)
const users = ref([])
const roles = ref([])
const areas = ref([])
const filter = ref('')

export default function () {
  const $q = useQuasar()

  const router = useRouter()
  const { isMe } = useIndex()

  const getRoles = async () => {
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
    roles.value = tipousuario || []
  }

  const getAreas = async () => {
    const graphqlQuery = {
      operationName: 'departamento',
      query: `query departamento {
        departamento(
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
    const { departamento } = data.data
    areas.value = departamento || []
  }

  const getUsers = async () => {
    const graphqlQuery = {
      operationName: 'usuarios',
      query: `query usuarios {
        usuarios(
          limit: 100
          orderBy: {field: id, direction: ASC}
        ) {
          id
          nombre
          apellidos
          usuario
          email
          foto
          tipoUsuario {
            id
            nombre
            descripcion
            createdAt
          }
          departamento{
            id
            nombre
            descripcion
            createdAt
          }
          claveIngreso
          claveAsistencia
          estado
          createdAt
        }
      }`,
    }

    const { data } = await api.post('/graphql', graphqlQuery)
    const { usuarios } = data.data
    users.value = usuarios || []
  }

  const onSubmit = async () => {
    delete user.value.tipoUsuario
    delete user.value.departamento

    if (
      !user.value.nombre ||
      !user.value.apellidos ||
      !user.value.usuario ||
      !user.value.tipoUsuarioId ||
      !user.value.departamentoId ||
      !user.value.claveIngreso ||
      !user.value.claveAsistencia
    ) {
      return $q.notify({ message: 'Ingrese datos faltantes', type: 'negative' })
    }

    const graphqlQuery = {
      operationName: 'createUsuario',
      query: `mutation createUsuario($user:UsuarioInput!){
        saveUsuario(input:$user){
            nombre
            apellidos
            usuario
            email
            foto
            tipoUsuario {
              id
              nombre
              descripcion
              createdAt
            }
            departamento{
              id
              nombre
              descripcion
              createdAt
            }         
            claveIngreso
            claveAsistencia
          }
        }`,
      variables: {
        user: {
          ...user.value,
          foto: user.value?.foto?.name ? user.value.foto.name : user.value?.foto,
        },
      },
    }

    if (user.value.foto) {
      const file = new FormData()
      file.append('file', user.value.foto)
      await api.post('api/usuarios', file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
    let res = await api.post('/graphql', graphqlQuery)
    if (res.status || res.data) {
      await getUsers()
      if (isMe.value(user.value))
        // store.user = {
        //   ...store.user,
        //   name: user.value.name,
        //   username: user.value.username,
        // }
        $q.notify({ message: res.message || 'Usuario guardado con exito', type: 'positive' })
      onReset()
      router.back()
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
    user.value.tipoUsuarioId = userToEdit?.tipoUsuario.id
    user.value.departamentoId = userToEdit?.departamento.id
    user.value.foto = userToEdit.foto ? new File([], userToEdit.foto) : null
    editMode.value = true
    router.push('/usuarios/new')
  }

  const onDelete = userToDelete => {
    $q.dialog({
      title: 'Confirmar',
      message: 'Esta acción eliminará el usuario seleccionado. ¿Está seguro?',
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      const graphqlQuery = {
        operationName: 'eliminarUsuario',
        query: `mutation eliminarUsuario($id:ID!){
          deleteUsuarios(
            where:{
              id:{
                eq:$id
              }
            }
          ){
          nombre
          apellidos
          usuario
          email
          foto
          tipoUsuario {
            id
            nombre
            descripcion
            createdAt
          }
          departamento{
            id
            nombre
            descripcion
            createdAt
          }
          claveIngreso
          claveAsistencia
          estado
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

  function changeStatus(row) {
    $q.dialog({
      title: 'Usuarios',
      message: `Está seguro de ${row.estado ? 'desactivar' : 'activar'} usuario?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      const tipoUsuarioId = row?.tipoUsuario.id
      const departamentoId = row?.departamento.id
      row.estado = !row.estado
      delete row.tipoUsuario
      delete row.departamento
      const graphqlQuery = {
        operationName: 'createUsuario',
        query: `mutation createUsuario($user:UsuarioInput!){
          saveUsuario(input:$user){
            estado
            }
          }`,
        variables: {
          user: {
            ...row,
            tipoUsuarioId,
            departamentoId,
          },
        },
      }

      const { status } = await api.post('/graphql', graphqlQuery)
      if (status) {
        return $q.notify({ message: 'Usuario actualizado con exito', type: 'positive' })
      }
      $q.notify({ message: 'Error al actualizar usuario', type: 'negative' })
    })
  }
  return {
    user,
    editMode,
    onSubmit,
    onReset,
    onEdit,
    onDelete,
    getRoles,
    getUsers,
    getAreas,
    changeStatus,
    users,
    roles,
    areas,
    filter,
  }
}
