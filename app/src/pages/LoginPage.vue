<template>
  <q-layout view="hHr LpR lFf">
    <q-page-container class="bg-color3">
      <q-page class="flex flex-center">
        <q-card flat bordered class="login-card">
          <div class="column justify-center items-center">
            <span class="text-h5 text-center"> <strong>CC</strong> Admin </span>
          </div>
          <q-card-section>
            <q-form @submit.prevent="loginUser" class="q-gutter-md bg-white q-pa-md q-mt-md">
              <q-input
                v-model="form.usuario"
                dense
                placeholder="Usuario"
                autofocus
                outlined
                required
                bg-color="white"
                autocomplete="new-username"
              >
                <template v-slot:append>
                  <q-icon name="mdi-account" />
                </template>
              </q-input>
              <q-input
                v-model="form.claveIngreso"
                dense
                type="password"
                placeholder="Contraseña"
                bg-color="white"
                outlined
                required
                autocomplete="new-password"
              >
                <template v-slot:append>
                  <q-icon name="mdi-key" />
                </template>
              </q-input>

              <div class="row justify-end">
                <q-btn
                  label="Ingresar"
                  type="submit"
                  color="color2"
                  no-caps
                  class="q-px-xl"
                  :disable="!form.usuario || !form.claveIngreso"
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Notify, Loading } from 'quasar'
import { useAuthStore } from 'stores/auth'

const router = useRouter()

const { login } = useAuthStore()

const form = reactive({ usuario: null, claveIngreso: null })

const loginUser = async () => {
  Loading.show()
  try {
    const r = await login(form)
    if (r === true) {
      Loading.hide()
      router.replace({ path: '/' })
    } else throw r
  } catch (e) {
    Notify.create({
      type: 'negative',
      message: 'Error de inicio de sesión ',
      caption: e.message,
    })
  } finally {
    Loading.hide()
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 30rem;
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
