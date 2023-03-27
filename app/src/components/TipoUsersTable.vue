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
      <template v-slot:body-cell-id="props">
        <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              color="color5"
              icon="mdi-pencil"
              size="sm"
              no-caps
              dense
              @click.stop="onEdit(props.row)"
            />

            <q-btn
              color="negative"
              icon="mdi-close-thick"
              size="sm"
              dense
              @click="onDelete(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useTipoUsers from '../composables/tipo-users'
import { date } from 'quasar'
const { formatDate } = date
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
    name: 'descripcion',
    label: 'Descripción',
    field: 'descripcion',
    align: 'left',
  },

  {
    name: 'createdAt',
    label: 'Fecha/Registro',
    field: 'createdAt',
    align: 'left',
    format: (val, row) => val && formatDate(val, 'YYYY-MM-DD HH:mm:ss'),
  },
]

const { users, filter, getUsers, onEdit, onDelete } = useTipoUsers()

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
