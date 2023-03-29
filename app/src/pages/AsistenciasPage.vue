<template>
  <q-page padding class="bg-color3">
    <div class="row items-center q-gutter-md">
      <span>Asistencias</span>
    </div>
    <q-separator size="md" class="q-my-sm" />
    <AsistenciasTable />
  </q-page>
</template>

<script setup>
import AsistenciasTable from 'src/components/AsistenciasTable.vue'
</script>
