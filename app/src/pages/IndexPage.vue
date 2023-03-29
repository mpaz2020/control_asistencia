<template>
  <q-page class="bg-color3">
    <div class="row bg-white q-gutter-md text-white q-pa-md">
      <div
        class="col text-center bg-color4 q-pa-md image"
        @click="$router.push('/asistencias')"
        style="cursor: pointer"
      >
        <span>
          <strong class="text-h5 text-bold">Lista asistencias</strong>
          <p>Módulo</p>
        </span>
        <div class="row justify-end">
          <q-icon name="list" style="opacity: 0.2" size="150px" color="black" />
        </div>
      </div>
      <div class="col text-left bg-color5 image">
        <div class="q-pa-md" @click="$router.push('/usuarios')" style="cursor: pointer">
          <span class="q-pl-md">
            <strong class="text-h5 text-bold">Empleados:</strong>
            <p>Total {{ total }}</p>
          </span>
          <div class="row justify-end">
            <q-icon name="mdi-account-group" style="opacity: 0.2" size="150px" color="black" />
          </div>
        </div>
        <div class="row justify-center items-center bg-orange-8 items-end">
          <q-btn
            text-color="white"
            label="Agregar"
            flat
            no-caps
            icon-right="mdi-arrow-right-circle"
            to="/usuarios/new"
          />
        </div>
      </div>
      <div
        class="col text-center bg-color6 q-pa-md image"
        @click="$router.push('/reportes')"
        style="cursor: pointer"
      >
        <span>
          <strong class="text-h5 text-bold">Reporte de asistencias</strong>
          <p>Módulo</p>
        </span>

        <div class="row justify-end">
          <q-icon name="list" style="opacity: 0.2" size="150px" color="black" class="" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'

const total = ref(null)

async function getCountUsers() {
  const graphqlQuery = {
    operationName: 'contarUsuarios',
    query: `query contarUsuarios {
        countUsuarios(where:{
          estado:{
            eq:true
          }
        }){
          total
        }
      }`,
  }

  const { data } = await api.post('/graphql', graphqlQuery)
  const { countUsuarios } = data.data

  total.value = countUsuarios?.total
}
onMounted(getCountUsers)
</script>

<style lang="scss" scoped>
.image {
  position: relative;
  width: 100%;
}
span {
  position: absolute;
  left: 0;
  width: 100%;
}
</style>
