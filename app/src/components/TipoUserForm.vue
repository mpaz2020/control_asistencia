<template>
  <q-card flat>
    <q-form @submit="onSubmit" @reset="onReset">
      <q-card-section>
        <div class="q-gutter-y-md" style="max-width: 50%">
          <div>
            <strong>Nombre(*):</strong>
            <q-input
              v-model="user.nombre"
              type="text"
              bg-color="blue-1"
              autocomplete="new-nombre"
              outlined
              autofocus
              required
              dense
            />
          </div>
          <div>
            <strong>Descripción:</strong>
            <q-input
              v-model="user.descripcion"
              type="textarea"
              bg-color="blue-1"
              autocomplete="new-descripcion"
              outlined
              autofocus
              dense
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions vertical align="left">
        <div class="row q-gutter-sm q-pl-sm">
          <q-btn
            label="Guardar"
            type="submit"
            text-color="white"
            color="color6"
            icon="save"
            no-caps
            no-wrap
            unelevated
            @click="$router.back()"
          />
          <q-btn
            label="Cancelar"
            type="reset"
            text-color="white"
            color="negative"
            icon="mdi-arrow-left-circle"
            no-caps
            no-wrap
            unelevated
            @click="onReset, $router.back()"
          />
        </div>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import useTipoUsers from '../composables/tipo-users'

const { user, onSubmit, onReset } = useTipoUsers()
</script>
