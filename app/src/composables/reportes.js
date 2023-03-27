import { date, Dialog, Notify, openURL } from 'quasar'
import { FORMATO_FECHA } from 'src/utils'
import { ref, computed } from 'vue'
import { useTermometriaStore } from 'stores/termometria'
import { api } from 'src/boot/axios'
import _ from 'lodash'

const showModal = ref(false)
const loading = ref(false)
const equipo = ref([])

const { formatDate, extractDate } = date

const dateSelection = ref({
  from: formatDate(new Date(), `${FORMATO_FECHA} 00:00`),
  to: formatDate(new Date(), `${FORMATO_FECHA} HH:mm`),
})

const filas = ref([])
const exportando = ref(false)
const filter = ref('')

export default function () {
  const termometriaStore = useTermometriaStore()

  const desde = computed(() =>
    extractDate(
      dateSelection.value?.from || dateSelection.value,
      `${FORMATO_FECHA} HH:mm`
    ).toISOString()
  )
  const hasta = computed(() =>
    extractDate(
      dateSelection.value?.to || dateSelection.value,
      `${FORMATO_FECHA} HH:mm`
    ).toISOString()
  )

  function openModal(eq) {
    equipo.value = eq
    showModal.value = true
    getData()
  }

  function closeModal() {
    showModal.value = false
  }

  async function getData() {
    loading.value = true
    try {
      const res = await termometriaStore.getDataByEquipoAndFecha({
        desde: desde.value,
        hasta: hasta.value,
        equipo_id: equipo.value.map(e => +e).join(),
      })

      const dt = _.groupBy(
        res.map(t => ({ ...t, fecha: formatDate(t.fecha, 'YYYY-MM-DD HH:mm') })),
        'fecha'
      )
      const group = Object.entries(dt).map(([key, value]) => {
        const summedData = value.reduce((acc, currenValue, i) => {
          Object.keys(currenValue)
            .filter(k => k !== 'fecha')
            .forEach(key => {
              acc[key] = (acc[key] || 0) + Number(currenValue[key])
            })
          return acc
        }, {})

        return {
          fecha: key,
          ...summedData,
        }
      })
      filas.value = group
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const currentEquipo = computed(() => termometriaStore.getEquipoById(equipo.value))

  async function exportar() {
    Dialog.create({
      title: 'CHIRI',
      message: '¿Está seguro de exportar los datos?',
      cancel: {
        label: 'No',
        color: 'red',
      },
      ok: {
        label: 'Si',
        color: 'primary',
      },
      persistent: true,
    }).onOk(async () => {
      exportando.value = true
      try {
        const graphqlQuery = {
          operationName: 'getTemperaturas',
          query: `query getTemperaturas($equipo: [ID], $desde: DateTime, $hasta: DateTime) {
            temperatura(limit:100,where: {fecha: {gte: $desde, lte: $hasta}, equipoId: {in:$equipo}}) {
              id
              fecha
              estado
              temperaturaC1
              temperaturaC2
              temperaturaC3
              temperaturaC4
              equipo {
                id
                name
                status
              }
            }
          }`,
          variables: {
            desde: desde.value,
            hasta: hasta.value,
            equipo_id: equipo.value.map(e => +e).join(),
          },
        }

        const res = await api.post('/api/termometria/reportes/xls', graphqlQuery)

        const ruta = 'reports/' + res.data.fileName
        openURL(ruta)
      } catch (error) {
        Notify.create({
          position: 'bottom-right',
          actions: [
            {
              icon: 'mdi-close-circle',
              color: 'white',
            },
          ],
          message: error,
          type: 'negative',
        })
      } finally {
        exportando.value = false
      }
    })
  }

  const equipos = computed(() => termometriaStore.equipos.filter(e => equipo.value.includes(e.id)))

  const columnas = computed(() => {
    if (!equipos.value.length) {
      return []
    }
    const cols = [
      {
        name: 'fecha',
        align: 'center',
        field: 'fecha',
        label: 'Fecha',
        format: (val, row) => val && formatDate(val, `${FORMATO_FECHA} HH:mm`),
      },
      ...equipos.value.map(e => {
        return {
          name: e.name,
          align: 'center',
          field: e.name,
          label: e.name,
          format: val => (val ? val.toFixed(1) : null),
        }
      }),
    ]
    return cols
  })

  return {
    showModal,
    loading,
    dateSelection,
    equipo,
    equipos,
    openModal,
    closeModal,
    getData,
    exportar,
    currentEquipo,
    columnas,
    filas,
    exportando,
    filter,
  }
}
