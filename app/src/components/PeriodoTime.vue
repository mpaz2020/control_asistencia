<template>
  <q-input outlined type="text" :label="label" :model-value="lblFecha" dense options-dense>
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            :model-value="modelValue"
            flat
            minimal
            mask="DD/MM/YYYY"
            :options="optionsFn"
            @update:model-value="value => $emit('update:model-value', value)"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            :model-value="modelValue"
            format24h
            mask="DD/MM/YYYY"
            :options="optionsFnTime"
            @update:model-value="value => $emit('update:model-value', value)"
          >
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { computed } from 'vue'
import { date } from 'quasar'
import { FORMATO_FECHA } from '../utils'

const { formatDate, extractDate } = date

const props = defineProps({
  label: {
    type: String,
    default: 'Periodo',
  },
  modelValue: {
    type: String,
  },
  nextPeriodo: {
    type: String,
  },
  previousPeriodo: {
    type: String,
  },
})

const optionsFn = date => {
  if (!props.nextPeriodo && !props.previousPeriodo) return true
  if (props.nextPeriodo) return optionsFnMaxDate(date, props.nextPeriodo)
  if (props.previousPeriodo) return optionsFnMinDate(date, props.previousPeriodo)

  return true
}

const lblFecha = computed(() => {
  if (Object(props.modelValue) === props.modelValue)
    return `${props.modelValue.from} al ${props.modelValue.to}`
  return props.modelValue
})

function optionsFnTime(hr, min, sec) {
  if (!props.nextPeriodo && !props.previousPeriodo) return true
  if (props.nextPeriodo) return optionsFnMaxTime(hr, min, sec, props.nextPeriodo, props.modelValue)
  if (props.previousPeriodo)
    return optionsFnMinTime(hr, min, sec, props.previousPeriodo, props.modelValue)
  return true
}

function optionsFnMaxDate(date, nextDate) {
  return date <= formatDate(extractDate(nextDate, `${FORMATO_FECHA} HH:mm`), 'YYYY/MM/DD')
}

function optionsFnMinDate(date, previousDate) {
  return (
    date >= formatDate(extractDate(previousDate, `${FORMATO_FECHA} HH:mm`), 'YYYY/MM/DD')
    // &&
    // date <= formatDate(new Date(), 'YYYY/MM/DD')
  )
}

function optionsFnMaxTime(hr, min, sec, nextDate, modelValue) {
  let fecha2 = new Date(extractDate(nextDate, `${FORMATO_FECHA} HH:mm`))
  let fecha1 = new Date(extractDate(modelValue, `${FORMATO_FECHA} HH:mm`))

  fecha1.setHours(hr)
  fecha1.setMinutes(min)
  fecha1.setSeconds(sec)

  if (fecha1 <= fecha2) return true
  return false
}

function optionsFnMinTime(hr, min, sec, previousDate, modelValue) {
  let fecha2 = new Date(extractDate(modelValue, `${FORMATO_FECHA} HH:mm`))
  let fecha1 = new Date(extractDate(previousDate, `${FORMATO_FECHA} HH:mm`))

  fecha2.setHours(hr)
  fecha2.setMinutes(min)
  fecha2.setSeconds(sec)

  if (fecha2 >= fecha1) return true
  return false
}
</script>
