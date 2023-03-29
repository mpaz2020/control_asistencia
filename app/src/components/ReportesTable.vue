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
      :rows="usersFilter"
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
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-checkbox v-model="props.row.aproved" dense color="color4" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useAsistencias from '../composables/asistencias'
import { date } from 'quasar'
const { formatDate } = date
const columns = [
  {
    name: 'fecha',
    label: 'Fecha',
    field: 'fecha',
    align: 'center',
  },
  {
    name: 'nombre',
    label: 'Nombres',
    align: 'center',
    format: (val, row) => row.usuario?.nombre + ' ' + row.usuario?.apellidos,
  },
  {
    name: 'asistencia',
    label: 'Asistencia',
    field: 'tipo',
    align: 'center',
  },

  {
    name: 'createdAt',
    label: 'Fecha/Hora',
    field: 'createdAt',
    align: 'center',
    format: (val, row) => val && formatDate(val, 'YYYY-MM-DD HH:mm:ss'),
  },

  {
    name: 'codigo',
    label: 'Código',
    align: 'left',
    format: (val, row) => row.usuario?.claveAsistencia,
  },
]

const { usersFilter, filter, getUsersByFilter } = useAsistencias()

onMounted(getUsersByFilter)
</script>

<style lang="scss" scoped>
.sticky-header-table {
  height: calc(100vh - 270px);
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
