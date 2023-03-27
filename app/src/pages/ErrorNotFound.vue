<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h2" style="opacity: 0.4">Página en desarrollo...</div>

      <q-btn
        class="q-mt-xl"
        color="secondary"
        text-color="black"
        unelevated
        to="/"
        label="Regresar"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
