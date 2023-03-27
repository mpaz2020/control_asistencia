<template>
  <q-page padding>
    <div class="row items-center q-gutter-md">
      <span>Tipo de Usuarios</span>
      <q-btn
        icon="mdi-plus-circle"
        label="Agregar"
        text-color="white"
        color="color4"
        no-caps
        unelevated
        to="/tipo-usuario/new"
        @click="onReset"
      />
    </div>
    <q-separator size="md" class="q-my-sm" />
    <TipoUsersTable />
  </q-page>
</template>

<script setup>
import TipoUsersTable from 'src/components/TipoUsersTable.vue'
import useTipoUsers from 'src/composables/tipo-users'

const { onReset } = useTipoUsers()
</script>
