<template>
  <v-chart ref="myChart" class="chart" :loading="loading" :option="option" autoresize />
</template>

<script setup>
import useHistoricos from '../composables/historicos'
import { computed, ref } from 'vue'
import { Options } from '../charts/options/historicos-line-option'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  dateSelection: {
    type: Object,
    required: true,
  },
})

const myChart = ref(null)
const { loading, data, equipos } = useHistoricos()

const option = computed(() => {
  myChart.value?.clear()
  return Options({ ...props, data: data.value, equipos: equipos.value })
})
</script>
<style lang="scss" scoped>
.chart {
  //height: 530px;
  // height: calc(100vh - 280px);
}
</style>
