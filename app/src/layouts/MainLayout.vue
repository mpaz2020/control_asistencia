<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="bg-color2 text-white" style="max-height: 94px">
      <q-toolbar style="max-height: 94px">
        <q-toolbar-title class="text-bold text-uppercase row">
          <span class="text-bold text-h5 text-white bg-color2 text-center" style="width: 225px">
            CC ADMIN
          </span>
          <q-btn
            flat
            @click="leftDrawerOpen = !leftDrawerOpen"
            round
            dense
            icon="mdi-menu"
            color="white"
          />

          <q-space />
        </q-toolbar-title>
        <q-avatar>
          <q-img :src="`/images/${user?.foto}`" />
        </q-avatar>
        <q-btn-dropdown
          no-caps
          stretch
          flat
          align="right"
          :label="userLabel"
          color="white"
          dropdown-icon="null"
        >
          <q-list>
            <q-item clickable tag="a" @click="logoutUser">
              <q-item-section>
                <q-item-label>Cerrar sesión</q-item-label>
              </q-item-section>
              <q-item-section avatar side>
                <q-icon name="mdi-logout" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="text-white bg-color1"
      :width="240"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :style="{
        marginTop: '150px',
        maxHeight: 'calc(100vh - 20px)',
      }"
    >
      <q-scroll-area :style="{ height: 'calc(100vh - 180px)' }">
        <div class="q-pa-sm text-left text-grey-8">MENÚ DE NAVEGACIÓN</div>
        <q-list padding>
          <q-item
            clickable
            v-ripple
            to="/"
            active-class="text-white bg-transparent text-weight-bold"
            class="link-item"
            :class="$route.path === '/' ? 'active-link' : ''"
          >
            <q-item-section avatar>
              <q-icon name="mdi-scale" />
            </q-item-section>
            <q-item-section>Escritorio</q-item-section>
          </q-item>

          <q-expansion-item
            label="Acceso"
            icon="mdi-folder"
            active-class="bg-transparent text-white text-weight-bold"
            class="link-item"
          >
            <q-list dense>
              <q-item
                clickable
                :active="$route.path === '/usuarios'"
                :inset-level="0.5"
                v-ripple
                to="/usuarios"
                no-caps
                dense
                class="rounded-right text-weight-regular"
                active-class="text-white"
              >
                <q-item-section avatar>
                  <q-icon
                    :name="$route.path === '/usuarios' ? 'mdi-circle' : 'mdi-circle-outline'"
                    size="xs"
                  />
                </q-item-section>
                <q-item-section> Usuarios </q-item-section>
              </q-item>
              <q-item
                clickable
                :active="$route.path === '/tipo-usuario'"
                :inset-level="0.5"
                v-ripple
                to="/tipo-usuario"
                no-caps
                dense
                class="rounded-right text-weight-regular"
                active-class="text-white"
              >
                <q-item-section avatar>
                  <q-icon
                    :name="$route.path === '/tipo-usuario' ? 'mdi-circle' : 'mdi-circle-outline'"
                    size="xs"
                  />
                </q-item-section>
                <q-item-section> Tipo Usuario </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item
            label="Departamento"
            icon="mdi-folder"
            active-class="bg-transparent text-white text-weight-bold"
            class="link-item"
          >
            <q-list dense>
              <q-item
                clickable
                :active="$route.path === '/departamento'"
                :inset-level="0.5"
                v-ripple
                to="/departamento"
                no-caps
                dense
                class="rounded-right text-weight-regular"
                active-class="text-white"
              >
                <q-item-section avatar>
                  <q-icon
                    :name="$route.path === '/departamento' ? 'mdi-circle' : 'mdi-circle-outline'"
                    size="xs"
                  />
                </q-item-section>
                <q-item-section> Departamento </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-expansion-item
            label="Asistencia"
            icon="mdi-folder"
            active-class="bg-transparent text-white text-weight-bold"
            class="link-item"
          >
            <q-list dense>
              <q-item
                clickable
                :active="$route.path === '/asistencia'"
                :inset-level="0.5"
                v-ripple
                to="/asistencias"
                no-caps
                dense
                class="rounded-right text-weight-regular"
                active-class="text-white"
              >
                <q-item-section avatar>
                  <q-icon
                    :name="$route.path === '/asistencias' ? 'mdi-circle' : 'mdi-circle-outline'"
                    size="xs"
                  />
                </q-item-section>
                <q-item-section> Asistencias </q-item-section>
              </q-item>
              <q-item
                clickable
                :active="$route.path === '/reportes'"
                :inset-level="0.5"
                v-ripple
                to="/reportes"
                no-caps
                dense
                class="rounded-right text-weight-regular"
                active-class="text-white"
              >
                <q-item-section avatar>
                  <q-icon
                    :name="$route.path === '/reportes' ? 'mdi-circle' : 'mdi-circle-outline'"
                    size="xs"
                  />
                </q-item-section>
                <q-item-section> Reportes </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
      <div class="absolute-top bg-color1" style="height: 150px; opacity: 0.95">
        <div class="absolute-center bg-transparent">
          <div class="row justify-around items-center q-gutter-sm">
            <q-avatar>
              <q-img v-if="user?.foto" :src="`/images/${user?.foto}`" />
            </q-avatar>
            <div class="">
              <div class="text-weight-bold">{{ userLabel }}</div>
              <q-badge color="color4" text-color="black" rounded class="q-mr-sm" />online
            </div>
          </div>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Dialog } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'

const leftDrawerOpen = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const userLabel = computed(() =>
  authStore.user ? authStore.user.nombre + ' ' + authStore.user.apellidos : ''
)
const user = computed(() => authStore.user)

const logoutUser = () => {
  Dialog.create({
    title: 'CC ADMIN',
    message: 'Desea cerrar la sesión?',
    cancel: {
      label: 'No',
      color: 'red',
    },
    ok: {
      label: 'Si',
      color: 'green',
    },
  }).onOk(async () => {
    await authStore.logout()
    router.replace({ path: '/asistencia' })
  })
}
</script>

<style lang="scss">
aside {
  background: transparent !important;
}
</style>
