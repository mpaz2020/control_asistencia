<template>
  <div>
    <div class="row justify-between items-center">
      <div class="q-gutter-sm">
        <q-btn color="white" text-color="black" label="Excel" outline />
        <q-btn color="white" text-color="black" label="PDF" outline />
      </div>
      <div class="row items-center q-gutter-md">
        <span>Buscar: </span>
        <q-input outlined dense bg-color="white" color="black" debounce="300" v-model="filter" />
      </div>
    </div>
    <q-separator class="q-my-sm" />
    <q-table
      :rows="users"
      :columns="columns"
      :pagination="{ rowsPerPage: 0 }"
      :filter="filter"
      row-key="name"
      separator="cell"
      class="sticky-header-table"
      flat
      bordered
      square
      dense
      table-class="bg-white text-black"
    >
      <template v-slot:body-cell-estado="props">
        <q-td :props="props">
          <q-btn
            dense
            no-caps
            :color="props.value ? 'color4' : 'color3'"
            :text-color="props.value ? 'white' : 'black'"
            :label="props.value ? 'Activado' : 'Desactivado'"
            unelevated
            @click="changeStatus(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-foto="props">
        <q-td :props="props">
          <q-img
            v-if="props.value || props.value?.name"
            :src="`http://localhost:3000/storage/images/${props.value?.name || props.value}`"
            width="30px"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-md">
            <q-btn
              color="color5"
              icon="mdi-pencil-outline"
              size="sm"
              no-caps
              dense
              @click.stop="onEdit(props.row)"
            />
            <q-btn color="color6" icon="mdi-key-outline" size="sm" no-caps dense />
            <q-btn
              v-if="!isMe(props.row)"
              color="negative"
              icon="mdi-close-thick"
              size="sm"
              dense
              @click="onDelete(props.row)"
            />
            <q-icon v-else color="positive" name="la la-user-lock" size="xs" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useUsers from '../composables/users'
import useIndex from '../composables'
import { date } from 'quasar'
const { formatDate } = date

const { isMe } = useIndex()

const columns = [
  {
    name: 'actions',
    label: 'Opciones',
    style: 'width: 150px',
    headerStyle: 'width: 150px',
    align: 'center',
  },

  {
    name: 'nombre',
    label: 'Nombres',
    field: 'nombre',
    align: 'left',
  },
  {
    name: 'apellidos',
    label: 'Apellidos',
    field: 'apellidos',
    align: 'left',
  },
  {
    name: 'usuario',
    label: 'Usuario',
    field: 'usuario',
    align: 'left',
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left',
  },
  {
    name: 'foto',
    label: 'Foto',
    field: 'foto',
    align: 'left',
  },
  {
    name: 'createdAt',
    label: 'Fecha/Registro',
    field: 'createdAt',
    align: 'left',
    format: (val, row) => val && formatDate(val, 'YYYY-MM-DD HH:mm:ss'),
  },
  {
    name: 'estado',
    label: 'Estado',
    field: 'estado',
    align: 'center',
  },
]

const { users, filter, getUsers, onEdit, onDelete, changeStatus } = useUsers()

onMounted(getUsers)
</script>

<style lang="scss" scoped>
.sticky-header-table {
  height: calc(100vh - 210px);
  width: 100%;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: white;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }

  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }
}
</style>
