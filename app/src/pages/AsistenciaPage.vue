<template>
  <q-layout view="hHr LpR lFf">
    <q-page-container class="bg-color3">
      <q-page class="flex flex-center">
        <q-card flat bordered class="login-card">
          <div class="q-py-md" v-if="form.banner.length">
            <span class="text-h6"><strong>Nombres: </strong>{{ form.name }}</span>
            <q-banner
              :class="`${form.banner.includes('Ingreso') ? 'bg-color4' : 'bg-color7'} text-white`"
            >
              {{ form.banner }}</q-banner
            >
          </div>
          <div class="column justify-center items-center q-col-gutter-md">
            <span class="text-h4 text-center"> <strong>CC</strong> ASISTENCIA </span>
            <span><strong>ASISTENCIA</strong> </span>
          </div>
          <q-card-section>
            <q-form @submit.prevent="marcarAsistencia" class="q-gutter-md">
              <q-input
                v-model="form.id"
                dense
                placeholder="ID de asistencia"
                autofocus
                outlined
                required
                bg-color="white"
              >
                <template v-slot:before>
                  <q-avatar size="5rem">
                    <q-img src="/images/robot.jpg" />
                  </q-avatar>
                </template>

                <template v-slot:append>
                  <q-btn
                    icon="mdi-arrow-right-thick"
                    flat
                    dense
                    :disable="!form.id"
                    @click.prevent="marcarAsistencia"
                    type="submit"
                  />
                </template>
              </q-input>

              <div class="row justify-center">
                <span class="text-grey-8">Ingresa tu ID de asistencia</span>
              </div>
              <div class="row justify-center">
                <q-btn
                  :label="user ? 'Home' : 'Iniciar Sesión'"
                  flat
                  color="color2"
                  no-caps
                  no-wrap
                  @click="user ? $router.replace('/') : $router.push('/login')"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { Notify, Loading } from 'quasar'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'stores/auth'
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const form = reactive({ id: null, name: null, banner: '' })

async function marcarAsistencia() {
  Loading.show()
  try {
    const { data } = await api.get('api/usuarios', { params: { claveAsistencia: form.id } })
    if (data) {
      Object.assign(form, data)
    }
  } catch (e) {
    Notify.create({
      type: 'negative',
      message: 'Error ',
      caption: e.message,
    })
  } finally {
    form.id = null
    Loading.hide()
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 25rem;
  max-width: 100vw;
  border-radius: 30px;
  background-color: transparent;
  border: none;
}

a:hover,
a:focus {
  text-decoration: none;
  color: #5b5e61;
}
</style>
