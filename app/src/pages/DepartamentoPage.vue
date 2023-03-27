<template>
  <q-page padding>
    <div class="row items-center q-gutter-md">
      <span>Departamento</span>
      <q-btn
        icon="mdi-plus-circle"
        label="Agregar"
        text-color="white"
        color="color4"
        no-caps
        unelevated
        to="/departamento/new"
        @click="onReset"
      />
    </div>
    <q-separator size="md" class="q-my-sm" />
    <DepartamentoTable />
  </q-page>
</template>

<script setup>
import DepartamentoTable from 'src/components/DepartamentoTable.vue'
import useDepartamento from 'src/composables/departamento'

const { onReset } = useDepartamento()
</script>
