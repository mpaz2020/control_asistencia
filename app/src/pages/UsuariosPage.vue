<template>
  <q-page padding>
    <div class="row items-center q-gutter-md">
      <span>Usuarios</span>
      <q-btn
        icon="mdi-plus-circle"
        label="Agregar"
        text-color="white"
        color="color4"
        no-caps
        unelevated
        to="/usuarios/new"
      />
    </div>
    <q-separator size="md" class="q-my-sm" />
    <UsersTable />
  </q-page>
</template>

<script setup>
import UsersTable from '../components/UsersTable.vue'
</script>
