<template>
  <q-page padding class="bg-color3">
    <div class="row items-center q-mb-md">
      <span>Consulta de Asistencias por Fecha</span>
    </div>
    <div class="row q-gutter-sm items-end">
      <div>
        <span><strong>Fecha Inicio</strong></span>
        <PeriodoTime label="" v-model="dateSelection.from" :nextPeriodo="dateSelection.to" />
      </div>
      <div>
        <span><strong>Fecha Fin</strong></span>
        <PeriodoTime label="" v-model="dateSelection.to" :previousPeriodo="dateSelection.from" />
      </div>
      <div>
        <span><strong>Empleado</strong></span>
        <q-select
          v-model="user"
          :options="users"
          :option-label="opt => opt.nombre + ' ' + opt.apellidos"
          option-value="id"
          :label="user ? '' : 'Seleccione...'"
          outlined
          emit-value
          map-options
          required
          dense
          options-dense
          style="min-width: 250px"
        />
      </div>
      <div>
        <q-btn
          color="color4"
          text-color="white"
          no-caps
          no-wrap
          unelevated
          label="Mostrar"
          :disable="loading"
          @click="getUsersByFilter"
        />
      </div>
    </div>
    <q-separator size="md" class="q-my-sm" />
    <ReportesTable />
  </q-page>
</template>

<script setup>
import PeriodoTime from '../components/PeriodoTime.vue'
import ReportesTable from 'src/components/ReportesTable.vue'
import useAsistencias from 'src/composables/asistencias'
import useUsers from 'src/composables/users'
import { onMounted } from 'vue'

const { user, loading, getUsersByFilter, dateSelection } = useAsistencias()
const { users, getUsers } = useUsers()

onMounted(getUsers)
</script>
