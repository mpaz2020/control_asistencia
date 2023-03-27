<template>
  <q-page padding :class="!isMobile && 'q-pa-md q-pl-lg q-pt-xs-lg'">
    <div class="row items-center justify-between">
      <div class="row q-gutter-sm q-gutter-y-md justify-xs-between justify-between">
        <Equipo v-model="equipo" :style="{ width: isMobile ? '96vw' : '250px' }" />
        <PeriodoTime
          label="Inicio"
          v-model="dateSelection.from"
          :nextPeriodo="dateSelection.to"
          :style="{ width: isMobile ? '48%' : '250px' }"
        />
        <PeriodoTime
          label="Fin"
          v-model="dateSelection.to"
          :previousPeriodo="dateSelection.from"
          :style="{ width: isMobile ? '47%' : '250px' }"
        />
        <q-btn
          rounded
          :color="
            !dateSelection.from || !dateSelection.to || !equipo.length ? 'gris-medio' : 'secondary'
          "
          text-color="black"
          icon="img:/icons/filtrar-black.svg"
          no-caps
          no-wrap
          unelevated
          label="Filtrar"
          class="q-px-xl"
          :class="isMobile && 'q-pl-xl q-pr-xl'"
          :loading="loading"
          @click="getData"
          :disable="!dateSelection.from || !dateSelection.to || !equipo.length"
        />
        <div>
          <q-btn
            no-caps
            no-wrap
            rounded
            unelevated
            :color="
              !filas.length || !dateSelection.from || !dateSelection.to || !equipo.length
                ? 'gris-medio'
                : 'secondary'
            "
            text-color="black"
            icon="img:/icons/exportar-black.svg"
            label="Exportar"
            class="q-px-lg"
            :class="isMobile && 'q-pl-xl q-pr-lg'"
            @click="exportar"
            :loading="exportando"
            :disable="!filas.length || !dateSelection.from || !dateSelection.to || !equipo.length"
          />
        </div>
      </div>
    </div>
    <q-separator class="q-my-sm" />
    <div :class="`${!isMobile && 'row q-gutter-md '}  ${isMobile && 'q-pl-none full-width'}`">
      <q-input
        outlined
        dense
        rounded
        v-model="filter"
        placeholder="Buscar"
        bg-color="white"
        color="black"
        no-caps
        no-wrap
        :class="isMobile && 'full-width'"
      >
        <template v-slot:append>
          <q-icon v-if="filter === ''" name="img:/icons/buscar-black.svg" />
          <q-icon
            v-else
            name="mdi-close-circle-outline"
            class="cursor-pointer"
            @click="filter = ''"
          />
        </template>
      </q-input>
    </div>
    <q-separator class="q-my-sm" />
    <q-table
      :loading="loading"
      :columns="columnas"
      :rows="filas"
      dense
      :pagination="{ rowsPerPage: isMobile ? 0 : 100 }"
      :rows-per-page-options="[10, 20, 50, 100]"
      :class="`tb-reporte card-rounded-borders ${!isMobile && ''}`"
      separator="cell"
      :filter="filter"
      row-key="id"
      table-class="bg-white text-black"
      :card-class="isMobile ? 'bg-primary text-white' : ''"
      :hide-pagination="isMobile"
    >
      <!-- <template v-slot:top>
        <div :class="`row items-center justify-center  ${isMobile && 'full-width'}`">
          <q-input
            outlined
            dense
            rounded
            v-model="filter"
            placeholder="Buscar"
            bg-color="white"
            color="black"
            no-caps
            no-wrap
            class="full-width"
          >
            <template v-slot:append>
              <q-icon v-if="filter === ''" name="img:/icons/buscar.svg" />
              <q-icon
                v-else
                name="mdi-close-circle-outline"
                class="cursor-pointer"
                @click="filter = ''"
              />
            </template>
          </q-input>
        </div>
      </template> -->
    </q-table>
  </q-page>
</template>

<script setup>
import useReportes from '../composables/reportes'
import PeriodoTime from '../components/PeriodoTime.vue'
import Equipo from '../components/EquipoComponent.vue'
import { onMounted } from 'vue'
import { useTermometriaStore } from 'stores/termometria'
import useIndex from '../composables'

const { isMobile } = useIndex()

const {
  loading,
  dateSelection,
  getData,
  equipo,
  filtrar,
  columnas,
  filas,
  exportando,
  filter,
  exportar,
} = useReportes()

const termometriaStore = useTermometriaStore()

onMounted(() => {
  if (!termometriaStore.equipos.length) {
    termometriaStore.getEquipos()
  }
  getData()
})
</script>

<style lang="scss" >
@media only screen and (max-width: 1024px) {
  .tb-reporte {
    height: calc(100vh - 300px);
  }
}

@media only screen and (min-width: 1024px) {
  .tb-reporte {
    height: calc(100vh - 210px);
  }

  .tb-reporte td:first-child,
  .tb-reporte th:first-child {
    position: sticky;
    left: 0;
    max-width: 150px;
    min-width: 150px;
  }
}

.tb-reporte {
  max-width: 100%;
}

.tb-reporte thead tr th {
  position: sticky;
  z-index: 1;
}

.tb-reporte tr th {
  background: white;
  position: sticky;
  z-index: 3;
}

.tb-reporte thead tr:first-child th {
  top: 0;
  z-index: 1;
}

.tb-reporte thead tr:nth-child(2) th {
  top: 28px;
  z-index: 1;
}

.tb-reporte thead tr:nth-child(3) th {
  top: 56px;
  z-index: 1;
}

.tb-reporte td:nth-child(-n + 1) {
  background-color: white;
}

.tb-reporte tr:first-child th:first-child,
.tb-reporte tr:first-child th:nth-child(-n + 1) {
  z-index: 3;
}

.tb-reporte td:first-child,
.tb-reporte td:first-child td:nth-child(-n + 1) {
  z-index: 1;
}
</style>
