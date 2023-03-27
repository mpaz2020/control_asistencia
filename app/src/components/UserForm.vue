<template>
  <q-card flat>
    <q-form @submit="onSubmit" @reset="onReset">
      <q-card-section>
        <div class="row q-gutter-x-md justify-between">
          <div class="col q-gutter-y-md">
            <div>
              <strong>Tipo usuario(*):</strong>
              <q-select
                v-model="user.tipoUsuarioId"
                :options="roles"
                bg-color="grey-2"
                option-label="nombre"
                option-value="id"
                :label="user.tipoUsuarioId ? '' : 'Seleccione...'"
                outlined
                emit-value
                map-options
                required
                dense
                options-dense
              />
            </div>
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
              <strong>Email:</strong>
              <q-input
                v-model="user.email"
                type="email"
                bg-color="blue-1"
                autocomplete="new-email"
                outlined
                autofocus
                dense
              />
            </div>
            <div>
              <strong>Clave de ingreso(*):</strong>
              <q-input
                v-model="user.claveIngreso"
                type="text"
                autocomplete="new-claveIngreso"
                outlined
                autofocus
                dense
              />
            </div>
            <div>
              <strong>Imagen:</strong>

              <q-file
                ref="foto"
                v-model="user.foto"
                dense
                outlined
                autofocus
                autocomplete="new-foto"
                bg-color="grey-2"
                accept=".jpg,.png,image/*"
              >
                <template v-slot:append>
                  <q-separator size="sm" vertical />
                  <q-btn
                    text-color="black"
                    label="Seleccionar foto"
                    no-caps
                    flat
                    icon="mdi-folder-open"
                    @click="foto.pickFiles()"
                  />
                </template>
              </q-file>
            </div>
          </div>
          <div class="col q-gutter-y-md">
            <div>
              <strong>Departamento (*):</strong>
              <q-select
                v-model="user.departamentoId"
                :options="areas"
                bg-color="grey-2"
                option-label="nombre"
                option-value="id"
                :label="user.departamentoId ? '' : 'Seleccione...'"
                outlined
                emit-value
                map-options
                required
                dense
                options-dense
              />
            </div>
            <div>
              <strong>Apellidos(*):</strong>
              <q-input
                v-model="user.apellidos"
                type="text"
                bg-color="blue-1"
                autocomplete="new-apellidos"
                outlined
                autofocus
                required
                dense
              />
            </div>
            <div>
              <strong>Usuario(*):</strong>
              <q-input
                v-model="user.usuario"
                type="text"
                bg-color="blue-1"
                autocomplete="new-usuario"
                outlined
                autofocus
                dense
              />
            </div>
            <div>
              <strong>Clave de asistencia(*):</strong>
              <q-btn
                color="color6"
                text-color="white"
                label="Generar"
                no-caps
                @click="generarClave"
              />
              <q-input
                v-model="user.claveAsistencia"
                type="text"
                autocomplete="new-claveAsistencia"
                outlined
                autofocus
                dense
              />
            </div>
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
import { onMounted, ref } from 'vue'
import useUsers from '../composables/users'

const foto = ref(null)

const { user, roles, areas, onSubmit, onReset, getRoles, getAreas } = useUsers()

onMounted(() => {
  if (!areas.value.length) {
    getAreas()
  }
  if (!roles.value.length) {
    getRoles()
  }
})

function generarClave() {
  const minus = 'abcdefghijklmnñopqrstuvwxyz'
  const mayus = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'

  user.value.claveAsistencia = ''

  for (let i = 1; i <= 8; i++) {
    let eleccion = Math.floor(Math.random() * 3 + 1)

    if (eleccion == 1) {
      let caracter1 = minus.charAt(Math.floor(Math.random() * minus.length))
      user.value.claveAsistencia += caracter1
    } else {
      if (eleccion == 2) {
        let caracter2 = mayus.charAt(Math.floor(Math.random() * mayus.length))
        user.value.claveAsistencia += caracter2
      } else {
        let num = Math.floor(Math.random() * 10)

        user.value.claveAsistencia += num
      }
    }
  }
}
</script>
